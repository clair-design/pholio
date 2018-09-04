const buble = require('buble')
const md2vue = require('md2vue')
const config = { gistInjection: '' }
const md2vuePromise = file =>
  new Promise((resolve, reject) => {
    md2vue(file, config, (err, vfile) => {
      if (err) reject(err)
      else resolve(vfile)
    })
  })

module.exports = async file => {
  const vueEnv = process.env.VUE_ENV
  process.env.VUE_ENV = 'browser'
  const vfile = await md2vuePromise(file)
  process.env.VUE_ENV = vueEnv

  const { frontmatter } = vfile.data
  let {
    meta,
    vars,
    title,
    route,
    heading,
    layout = 'default',
    ...rest
  } = frontmatter

  title = title || heading
  layout = layout || 'default'
  meta = meta || {}
  meta.title = title

  const _route = route.replace(/^\//, '')
  const arr = _route.split('/')
  const isMain = _route === '' || (arr[0] === 'index' && !arr[1])
  const fullPath = isMain ? '/' : `/${_route}`

  const contents = vfile.contents.replace(
    /styleInject = require[^\n]+/,
    'styleInject = createApp.styleInject'
  )
  const { code } = buble.transform(contents)
  const content = `(function(){
var module = {}
${code}
module.exports.metaInfo = function () {
  return ${JSON.stringify(meta)}
}
module.exports.computed = {
  $vars: function () {
    return ${JSON.stringify(vars || {})}
  },
  $page: function () {
    var currentPath = this.$route.path
    var matched = this.$pages.filter(function (info) {
      return info.path === currentPath
    })
    return matched[0] || {}
  }
}
return module.exports
})()`

  return {
    rest,
    title,
    layout,
    fullPath,
    content,
    pageNav: vfile.data.toc
  }
}

module.exports.config = option => {
  Object.assign(config, option)
}
