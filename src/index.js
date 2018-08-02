const { resolve, join } = require('path')
const hasSum = require('hash-sum')
const isEqual = require('lodash/isEqual')
const { removeSync, ensureFile, writeFile, copy } = require('fs-extra')
const { map, skip, distinctUntilChanged } = require('rxjs/operators')
const { BehaviorSubject, Observable, combineLatest } = require('rxjs')
const skipOne = skip(1)

const logger = require('./util/logger')
const renderFile = require('./util/renderFile')
const getCacheDir = require('./util/getCacheDir')
const concatExternals = require('./util/externals')

const md2vue = require('./compiler/markdown')
const devServer = require('./server/index.js')
const kServerTempl = resolve(__dirname, '../template/pages.server.js.ejs')
const kClientTempl = resolve(__dirname, '../template/pages.client.js.ejs')

/**
 * vendor: build only once
 */
const getVendorStream = () => {
  // use BehaviorSubject to keep latest value
  const vendor$$ = new BehaviorSubject(null)
  require('./vendor')().subscribe(vendor$$)

  return Observable.create(observer => {
    // skip first element null
    vendor$$.pipe(skipOne).subscribe(observer)
  })
}

/**
 * bones: layouts and plugins are bundled together
 */
const getBonesStream = config => {
  const bones$$ = new BehaviorSubject(null)
  require('./bones')(config).subscribe(bones$$)
  return Observable.create(observer => {
    // skip first element null
    bones$$.pipe(skipOne).subscribe(observer)
  })
}

/**
 * flesh: documents
 */
const getFleshStream = patterns => {
  return require('./flesh')(patterns)
}

/**
 * main logics
 */
// npm-prefix: project root/base dir
process.env.NPM_PREFIX =
  process.env.NPM_PREFIX || require('execa').shellSync('npm prefix').stdout
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = process.env.NODE_ENV === 'production'

module.exports = function main (config) {
  process.env.PORT = config.PORT || (process.env.PORT || 3000)
  const npmPrefix = process.env.NPM_PREFIX
  const staticDirectory = resolve(npmPrefix, config.assetPath)

  md2vue.config(config.md2vue)

  const vendor$ = getVendorStream()
  const bones$ = getBonesStream({
    pluginDirectory: config.plugins,
    layoutDirectory: config.layouts
  })
  const flesh$ = getFleshStream(config.pages)
  const infra$ = combineLatest(bones$, vendor$).pipe(
    distinctUntilChanged(([bone1, vendor1], [bone2, vendor2]) => {
      const scriptUnchanged =
        vendor1.hash === vendor2.hash && bone1.script.hash === bone2.script.hash

      if (!isProd) {
        return scriptUnchanged
      }

      if (bone1.styles) {
        return scriptUnchanged && bone1.styles.hash === bone2.styles.hash
      }
    })
  )

  flesh$.subscribe(({ type, delta }) => {
    if (type === 'delete') {
      const { previous } = delta
      return devServer.emit({ type, payload: { previous } })
    }

    if (type === 'update' || type === 'add') {
      const { previous, current } = delta
      return devServer.emit({ type, payload: { previous, current } })
    }
  })

  flesh$
    .pipe(
      map(data => {
        const pages = [...data.payload.values()]
        const navInfo = pages.map(page => {
          return {
            title: page.title,
            path: page.fullPath,
            layout: page.layout
          }
        })
        return navInfo
      }),
      distinctUntilChanged((a, b) => isEqual(a, b))
    )
    .subscribe(navInfo => {
      devServer.emit({
        type: 'prototype',
        payload: {
          key: '$pages',
          value: navInfo
        }
      })
    })

  infra$.pipe(skipOne).subscribe(() => {
    devServer.emit({ type: 'reload' })
  })

  combineLatest(infra$, flesh$).subscribe(async data => {
    const [infra, { payload: flesh }] = data
    const [bones, vendor] = infra

    const routerMode = config.routerMode || 'history'
    const pages = [...flesh.values()]
    const navInfo = pages.map(page => {
      return {
        title: page.title,
        path: page.fullPath,
        layout: page.layout,
        TOC: page.pageNav
      }
    })

    // FOR SSR
    const option = {
      pages,
      navInfo,
      routerMode,
      errorRedirect: config.errorRedirect || '/'
    }

    const [resClient, resServer] = await Promise.all([
      renderFile(kClientTempl, option),
      renderFile(kServerTempl, option)
    ])

    const serverConfig = {
      navInfo,
      routerMode,
      staticDirectory,
      externals: concatExternals(config.externals),
      vendor,
      bones,
      flesh: {
        content: resServer,
        hash: hasSum(resServer)
      },
      manifest: {
        content: resClient,
        hash: hasSum(resClient)
      },
      pages: new Map(pages.map(({ hash, content }) => [hash, content]))
    }

    await new Promise(resolve => setTimeout(resolve, 100))

    devServer.config(serverConfig)

    if (isProd) {
      logger.succeed('SSR started.')
      const dest = resolve(npmPrefix, config.output || '.site')
      const PORT = process.env.PORT
      const request = require('request-promise')

      const resources = [
        ...(routerMode !== 'hash' ? pages.map(page => page.fullPath) : '/'),
        ...pages.map(page => `/static/page.${page.hash}.js`),
        `/static/vendor.${vendor.hash}.js`,
        `/static/framework.${bones.script.hash}.js`,
        `/static/manifest.${serverConfig.manifest.hash}.js`,
        `/static/styles.${bones.styles.hash}.css`
      ]

      const promises = resources.map(resource => {
        const url = `http://127.0.0.1:${PORT}${resource}`
        const isHTML = !/\.(css|js)$/.test(resource)
        return request(url)
          .then(async html => {
            const path = `${dest}${resource}${isHTML ? '/index.html' : ''}`
            await ensureFile(path)
            await writeFile(path, html)
          })
          .catch(e => logger.fail(url))
      })

      await Promise.all(promises)
      await copy(staticDirectory, join(dest, 'static'))
      logger.succeed('SSR Done.')

      const stripPrefix =
        dest.replace(/\\/g, '/') + (routerMode !== 'hash' ? '' : '/')
      const params = {
        stripPrefix,
        staticFileGlobs: [
          `${dest}/static/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}`
        ],
        logger: data => logger.succeed(data)
      }
      require('sw-precache').write(`${dest}/service-worker.js`, params, () =>
        process.exit(0)
      )
    }
  })
}

module.exports.clean = () => {
  removeSync(getCacheDir())
  logger.succeed('Done.')
  logger.stop()
}

process.on('uncaughtException', e => {
  logger.fail('Uncaught exception:')
  console.error(e)
})
