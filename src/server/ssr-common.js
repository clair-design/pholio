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

// if (process.env.NODE_ENV === 'development') {
//   if (typeof window !== 'undefined' && window.EventSource) {
//     const source = new window.EventSource('/__sse__')

//     source.addEventListener('message', event => {
//       const { type } = JSON.parse(event.data)

//       if (type === 'reload') {
//         window.location.reload()
//       }
//     })

//     source.addEventListener('error', _ => source.close())
//   }
// }

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
        return (jsonpCache[id] = page)
      })
  }

  return Promise.resolve(null)
}

module.exports = createApp

function createApp ({ mode, routes, data, render, plugins }) {
  if (plugins && plugins.install) {
    Vue.use(plugins)
  }

  const router = new VueRouter({
    mode: mode || 'hash',
    routes,
    scrollBehavior: () => ({ x: 0, y: 0 })
  })

  const app = new Vue({
    router,
    render,
    data: data || {}
  })

  router.onReady(() => app.$mount('#app'))

  return { app, router }
}
