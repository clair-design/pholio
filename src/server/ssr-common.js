const Vue = require('vue')
const VueMeta = require('vue-meta')
const VueRouter = require('vue-router')
const fetchJSONP = require('fetch-jsonp')
const objectAssign = require('lodash/assign')
Object.assign = objectAssign

Vue.use(VueMeta)
Vue.use(VueRouter)

if (typeof window !== 'undefined' && window.window === window) {
  window.Vue = Vue
}

let cachedOption = null
const jsonpCache = {}
createApp.use = plugin => Vue.use(plugin)
createApp.jsonp = function (id) {
  if (jsonpCache[id]) {
    return Promise.resolve(jsonpCache[id])
  }

  // client
  if (typeof window !== 'undefined') {
    return fetchJSONP(`/static/page.${id}.js`, {
      jsonpCallbackFunction: '__jsonpResolve'
    })
      .then(r => r.json())
      .then(page => {
        page.__hash = id
        return (jsonpCache[id] = page)
      })
  }

  return Promise.resolve(null)
}

module.exports = createApp

function createApp (option) {
  const { mode, routes, data, render, plugins } = option
  if (plugins) {
    ;[].concat(plugins).map(plugin => Vue.use(plugin))
  }

  const router = new VueRouter({
    mode: mode || 'hash',
    routes,
    scrollBehavior: () => ({ x: 0, y: 0 })
  })

  Object.defineProperty(Vue.prototype, '$pageTOC', {
    get () {
      const path = router.currentRoute.path
      const match = Vue.prototype.$pages.filter(page => page.path === path)
      return match[0] ? match[0].TOC : []
    }
  })

  const app = new Vue({
    router,
    render,
    data: data || {}
  })

  router.onReady(() => app.$mount('#root'))
  cachedOption = objectAssign(option, { app, router })
  return { app, router }
}

let applyReload = null
if (process.env.NODE_ENV !== 'production') {
  applyReload = function () {
    cachedOption.app.$destroy()
    createApp(cachedOption)
  }

  if (typeof window !== 'undefined' && window.EventSource) {
    let retry = 300
    let pollId = null
    let source = null
    const connect = () => {
      source && source.close()
      source = new window.EventSource('/__sse__')
      source.addEventListener('open', () => {
        if (pollId) {
          clearInterval(pollId)
          pollId = null
          window.location.reload()
        }

        source.addEventListener('message', handleSSEMessage)
        source.addEventListener('error', _ => {
          source.close()
          clearInterval(pollId)
          if (retry > 0) {
            retry--
            pollId = setInterval(connect, 5 * 1000)
          }
        })
      })
    }
    connect()
  }
}

function handleSSEMessage ({ data }) {
  const { alert, confirm } = window.notie
  const { type, payload = {} } = JSON.parse(data)

  if (type === 'init') {
    return alert({
      type: 'info',
      text: 'Development server connected...',
      time: 1.5
    })
  }

  if (!cachedOption) return
  const { router, routes } = cachedOption

  if (type === 'reload') {
    return confirm(
      { text: 'Do you want to reload browser for latest updates?' },
      () => window.location.reload()
    )
  }

  if (type === 'prototype') {
    const { key, value } = payload
    Vue.prototype[key] = value
    Vue.set(Vue.prototype, key, value)

    alert({
      type: 'info',
      text: 'Performing hot reload...',
      time: 1
    })
    const { app } = cachedOption
    app.$forceUpdate()
    app.$children.forEach(c => c.$forceUpdate())
    return
  }

  if (type === 'update' || type === 'add') {
    const { previous = {}, current } = payload
    const prevHash = previous.hash
    const { hash, fullPath, layout, content } = current
    const dynamicComponent = () => createApp.jsonp(hash)

    // update cache
    if (prevHash) jsonpCache[prevHash] = null
    jsonpCache[hash] = objectAssign(
      // eslint-disable-next-line no-new-func
      Function(`return ${content}`)(),
      { __hash: hash }
    )

    // update `routes`
    const newRoute = {
      path: fullPath,
      meta: { layout },
      component: dynamicComponent
    }
    routes.filter((route, index) => {
      const match = route.path === fullPath
      if (match) {
        routes[index] = newRoute
      }
      return match
    })

    // update current page
    if (prevHash && prevHash === getActiveRouteHash(router)) {
      alert({
        type: 'info',
        text: 'Performing hot reload...',
        time: 1
      })
      return applyReload()
    }

    // update current existing page
    if (type === 'update') {
      const matched = getMatchedRouteConfig(router, fullPath)
      return objectAssign(matched, {
        meta: { layout },
        components: { default: dynamicComponent }
      })
    }

    // handle new page
    routes.splice(-1, 0, newRoute)
    return router.addRoutes([newRoute])
  }

  if (type === 'delete') {
    const { previous } = payload
    const { hash, fullPath } = previous
    jsonpCache[hash] = null
    cachedOption.routes = routes.filter(route => route.path !== fullPath)

    const matched = getMatchedRouteConfig(router, fullPath)
    objectAssign(matched, {
      components: {
        default: {
          render (h) {
            return h('div', null, 'Page was deleted...')
          }
        }
      }
    })

    if (hash === getActiveRouteHash(router)) {
      return alert({
        type: 'warning',
        text: 'Current page was deleted, please reload your browser manually.'
      })
    } else {
      return confirm(
        {
          text: 'Some page was deleted, do you want to reload browser for latest updates?'
        },
        () => window.location.reload()
      )
    }
  }
}

function getActiveRouteHash (router) {
  const comp = router.currentRoute.matched[0].components
  return (comp.default || comp)['__hash']
}

function getMatchedRouteConfig (router, path) {
  return router.matcher.match(path).matched[0]
}
