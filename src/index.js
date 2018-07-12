const { resolve } = require('path')
const hasSum = require('hash-sum')
const { skip, distinctUntilChanged } = require('rxjs/operators')
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

// https://rxjs-dev.firebaseapp.com/guide/v6/migration#dep-methods
const infra$ = combineLatest(bones$, vendor$).pipe(
  distinctUntilChanged(
    ([bone1, vendor1], [bone2, vendor2]) =>
      bone1.hash === bone2.hash && vendor1.hash === vendor2.hash
  )
)

combineLatest(infra$, flesh$).subscribe(data => {
  const [[bones, vendor], flesh] = data

  const pages = [...flesh.values()]

  // FOR SSR
  const option = {
    pages,
    routerMode: 'history'
  }

  Promise.all([
    renderFile(kClientTempl, option),
    renderFile(kServerTempl, option)
  ]).then(([resClient, resServer]) => {
    devServer.config({
      vendor,
      bones,
      flesh: {
        content: resServer,
        hash: hasSum(resServer)
      },
      pages: new Map(pages.map(({ hash, content }) => [hash, content])),
      app: {
        content: resClient,
        hash: hasSum(resClient)
      }
    })
  })
  // FOR SSR MODE
  // const ssrTemplate = '__jsonpResolve("<%- item.hash %>", <%- item.content %>)'
})
