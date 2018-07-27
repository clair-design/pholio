const { resolve } = require('path')
const hasSum = require('hash-sum')
const isEqual = require('lodash/isEqual')
const { map, skip, distinctUntilChanged } = require('rxjs/operators')
const { BehaviorSubject, Observable, combineLatest } = require('rxjs')
const skipOne = skip(1)

const renderFile = require('./util/render-file')
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
process.env.NPM_PREFIX = require('execa').shellSync('npm prefix').stdout
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const vendor$ = getVendorStream()
const bones$ = getBonesStream({
  pluginDirectory: 'example/plugins',
  layoutDirectory: 'example/layouts'
})
const flesh$ = getFleshStream(['example/content/**/*.md'])

const isProd = process.env.NODE_ENV === 'production'
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

flesh$.pipe(
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
).subscribe(navInfo => {
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
    routerMode: 'history'
  }

  const [resClient, resServer] = await Promise.all([
    renderFile(kClientTempl, option),
    renderFile(kServerTempl, option)
  ])

  // console.log(resServer)
  devServer.config({
    navInfo,
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
    pages: new Map(pages.map(({ hash, content }) => [hash, content])),
    staticDirectory: resolve(process.env.NPM_PREFIX, 'example/static')
  })
})
