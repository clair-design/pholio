const { resolve } = require('path')
const express = require('express')
const { createRenderer } = require('vue-server-renderer')
const createApp = require('./ssr-common')
const renderFile = require('../util/render-file')
const evalByVM = require('../util/vm-eval')

const kTemplate = resolve(__dirname, '../../template/ssr.template.html.ejs')
const renderHTML = data => renderFile(kTemplate, data)

const RE_STATIC = /^\/static\/([a-z]+)\.([a-z0-9]+)\.js/

const app = express()
let isListening = false
const renderer = createRenderer({ template: '<!--vue-ssr-outlet-->' })

module.exports = {
  config ({ vendor, bones, flesh, pages, app }) {
    const plugins = evalByVM(bones.content)
    flesh.exports = evalByVM(flesh.content)
    flesh.exports.plugins = plugins

    Object.assign(this, {
      vendor,
      bones,
      flesh,
      pages,
      app
    })

    this.start()
  },

  start () {
    if (isListening === false) {
      this.setRoutes(app)
      app.listen(1126)
      isListening = true
      console.log('Server listening on port: 1126')
    } else {
      console.log('Server updates...')
    }
  },

  setRoutes () {
    // favicon
    app.use('/favicon.ico', (req, res) => res.end(''))

    // special files
    app.use(RE_STATIC, (req, res, next) => {
      res.set('Content-Type', 'application/javascript')
      const { vendor, bones, app, pages } = this

      const type = req.params[0]
      const hash = req.params[1]

      if (type === 'vendor' && hash === vendor.hash) {
        return res.end(vendor.content)
      }

      if (type === 'plugins' && hash === bones.hash) {
        return res.end(bones.content)
      }

      if (type === 'app' && hash === app.hash) {
        return res.end(app.content)
      }

      if (type === 'page' && pages.has(hash)) {
        return res.end(`__jsonpResolve(${pages.get(hash)})`)
      }

      next()
    })

    // TODO
    // support for static assets
    // app.use('/static', express.static(this.staticDir))
    app.use('/static', (req, res) => {
      res.end('')
    })

    app.use('*', (req, res) => {
      res.set('Content-Type', 'text/html')
      this.handleSSR(req, res)
    })
  },

  handleSSR (req, res) {
    const { app, router } = createApp(this.flesh.exports)
    router.push(req.originalUrl)
    router.onReady(async () => {
      if (!router.getMatchedComponents().length) {
        return res.status(404).end('<pre>Not found</pre>')
      }

      try {
        const result = await renderer.renderToString(app)
        const html = await renderHTML({
          ...app.$meta().inject(),
          hash: {
            vendor: this.vendor.hash,
            plugins: this.bones.hash,
            app: this.app.hash
          },
          externals: {
            js: '',
            css: ''
          },
          serviceWorker: false,
          ssrContent: result
        })
        res.end(html)
      } catch (e) {
        // TODO
        // report error
        console.log(e)
        return res.status(500).end(`<pre>${e.stack}</pre>`)
      }
    })
  }
}
