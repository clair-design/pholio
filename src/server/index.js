const { resolve } = require('path')
const express = require('express')
const SSE = require('express-sse')
const UglifyJS = require('uglify-js')
const { createRenderer } = require('vue-server-renderer')

const logger = require('../util/logger')
const createApp = require('./ssr-common')
const evalByVM = require('../util/vmEval')
const renderFile = require('../util/renderFile')

const kSSRTemplate = resolve(__dirname, '../../template/ssr.template.html.ejs')
const kHashTemplate = resolve(
  __dirname,
  '../../template/hash.template.html.ejs'
)
const renderSSRTempl = data => renderFile(kSSRTemplate, data)
const renderHashTempl = data => renderFile(kHashTemplate, data)

const RE_STATIC = /^\/static\/([a-z]+)\.([a-z0-9]+)\.(js|css)/

const server = express()
const sseInstance = new SSE([{ type: 'init' }])
let isListening = false
const renderer = createRenderer({ template: '<!--vue-ssr-outlet-->' })

module.exports = {
  config ({
    navInfo,
    routerMode,
    staticDirectory,
    vendor,
    bones,
    flesh,
    manifest,
    pages,
    externals
  }) {
    let ssrAppConfig = null
    if (routerMode === 'history') {
      // flesh & bones are bundled toggether in ssr mode
      // no code splitting...
      const framework = evalByVM(bones.script.content)
      flesh.exports = evalByVM(flesh.content)
      flesh.exports.framework = framework

      ssrAppConfig = {
        ...flesh.exports,
        plugins: [
          framework,
          {
            install (Vue) {
              Vue.prototype.$pages = navInfo
            }
          }
        ]
      }
    }

    Object.assign(this, {
      vendor, // vue + vue-router + vue-meta
      bones, // plugins and layouts
      pages, // each markdown page
      manifest, // manifest for browsers
      externals,
      routerMode,
      staticDirectory,
      ssrAppConfig
    })

    this.start()
  },

  start () {
    if (isListening === false) {
      const PORT = process.env.PORT || 3000
      this.setRoutes()
      server.listen(PORT)
      isListening = true
      if (process.env.NODE_ENV !== 'production') {
        logger.succeed(`Server listening on port: ${PORT}`)
      }
    } else {
      // send signal...
      logger.succeed('Updating...')
    }
  },

  setRoutes () {
    // favicon
    server.use('/favicon.ico', (req, res) => res.end(''))

    // SSE
    server.use('/__sse__', sseInstance.init)

    // special files
    server.use(RE_STATIC, (req, res, next) => {
      const { vendor, bones, manifest, pages } = this
      const type = req.params[0]
      const hash = req.params[1]

      res.set(
        'Content-Type',
        type === 'styles' ? 'text/css' : 'application/javascript'
      )

      if (type === 'vendor' && hash === vendor.hash) {
        return res.end(vendor.content)
      }

      if (type === 'framework' && hash === bones.script.hash) {
        return res.end(bones.script.content)
      }

      if (type === 'manifest' && hash === manifest.hash) {
        return res.end(preprocess(manifest.content))
      }

      if (type === 'page' && pages.has(hash)) {
        const wrapped = `__jsonpResolve(${pages.get(hash)})`
        return res.end(preprocess(wrapped))
      }

      if (type === 'styles' && bones.styles) {
        if (hash === bones.styles.hash) {
          return res.end(bones.styles.content)
        }
      }
      next()
    })

    const middleware = express.static(this.staticDirectory)
    server.use('/static', middleware, (_, res) =>
      res.status(404).end('NOT FOUND')
    )

    server.use('*', (req, res) => {
      res.set('Content-Type', 'text/html')
      this.handleSSR(req, res)
    })
  },

  handleSSR (req, res) {
    const { script, styles } = this.bones
    const renderData = {
      hash: {
        vendor: this.vendor.hash,
        framework: script.hash,
        manifest: this.manifest.hash,
        stylesheet: styles ? styles.hash : ''
      },
      externals: this.externals,
      serviceWorker: process.env.NODE_ENV === 'production'
    }

    if (this.routerMode !== 'history') {
      return renderHashTempl(renderData).then(html => {
        res.end(html)
      })
    }

    const { app, router } = createApp(this.ssrAppConfig)
    router.push(req.originalUrl)
    router.onReady(async () => {
      if (!router.getMatchedComponents().length) {
        return res.status(404).end('<pre>Not found</pre>')
      }

      try {
        const html = await renderSSRTempl({
          ...app.$meta().inject(),
          ...renderData,
          ssrContent: await renderer.renderToString(app)
        })
        res.end(html)
      } catch (e) {
        logger.fail(e)
        return res.status(500).end(`<pre>${e.stack}</pre>`)
      }
    })
  },

  emit (message) {
    sseInstance.send(message)
  }
}

function preprocess (code) {
  if (process.env.NODE_ENV === 'production') {
    return UglifyJS.minify(code).code
  }
  return code
}
