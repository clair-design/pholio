// NOTE
// `require.context` must be treated as a whole. by
// NO means you should split them up, as is required
// by the rollup plugin, rollup-plugin-require-context
// SEE https://github.com/elcarim5efil/rollup-plugin-require-context
const pluginReqs = require.context('<%= pluginDirectory %>', true, /\.js$/)
const layoutReqs = require.context('<%= layoutDirectory %>', true, /\.vue$/)

const getModule = function (module) {
  return (module.__esModule && module.default) || module
}

const entry = {
  install (Vue) {
    pluginReqs.keys().forEach(key => {
      Vue.use(getModule(pluginReqs(key)))
    })

    layoutReqs.keys().forEach(key => {
      const module = getModule(layoutReqs(key))
      let name = module.name
      if (!name) {
        const arr = key.split(/\/|\\/)
        const basename = arr[arr.length - 1]
        name = basename.replace(/\.vue$/, '')
      }
      Vue.component(`layout-${name}`, module)
    })
  }
}

if (typeof window !== 'undefined' && window.createApp) {
  window.createApp.use(entry)
}

if (typeof module !== 'undefined') {
  module.exports = entry
}
