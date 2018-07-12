const { resolve, relative } = require('path')

const md2vue = require('md2vue')
const { loadFront } = require('yaml-front-matter')
const { readFile, existsSync } = require('fs-extra')

const pascalCase = require('../util/pascal-case')

const RE_REMOVE = /window\.Vue && Vue\.use\(component\);\s*$/
const userConfig = loadConfig()

module.exports = async (file, content) => {
  const name = pascalCase(relative(process.cwd(), file))

  if (typeof content === 'undefined') {
    content = await readFile(file, 'utf-8')
  }

  const {
    title,
    layout,
    route,
    meta,
    markdown,
    highlight = 'prism'
  } = loadFront(content.trim(), 'markdown')

  const _route = route.replace(/^\//, '')
  const arr = _route.split('/')
  const isMain = arr[0] === 'index' && !arr[1]
  const fullPath = isMain ? '/' : `/${_route}`

  const config = Object.assign({ name }, userConfig, { highlight })
  config.extend.metaInfo = {
    ...config.extend.metaInfo,
    ...meta,
    title
  }

  const compiled = await md2vue(markdown, config)
  const code = `(function(){
var exports = {}
var module = { epxorts: exports }
${compiled.replace(RE_REMOVE, 'false')}
return module.exports
})()`

  return { layout, fullPath, content: code }
}

function loadConfig () {
  const defaults = {
    target: 'js',
    inject: '',
    extend: {
      metaInfo: {}
    }
  }
  const configPath = resolve(
    process.env.NPM_PREFIX || process.cwd(),
    'md2vue.cofig.js'
  )

  if (existsSync(configPath)) {
    try {
      return Object.assign(defaults, require(configPath))
    } catch (e) {}
  }

  return defaults
}
