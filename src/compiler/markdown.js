/* eslint-disable no-new-func */
const { resolve, relative } = require('path')
const md2vue = require('md2vue')
const { loadFront } = require('yaml-front-matter')
const { readFile, existsSync } = require('fs-extra')

const toSlug = require('limax')
const visit = require('unist-util-visit')
const toString = require('mdast-util-to-string')
const math = require('remark-math')
const katex = require('remark-html-katex')
const externalLinks = require('remark-external-links')
const normalizeHeadings = require('remark-normalize-headings')

const pascalCase = require('../util/pascalCase')

const RE_REMOVE = /window\.Vue && Vue\.use\(component\);\s*$/
const userConfig = loadConfig()

module.exports = async (file, content) => {
  const name = pascalCase(relative(process.cwd(), file))

  if (typeof content === 'undefined') {
    content = await readFile(file, 'utf-8')
  }

  const { title, layout, route, meta, vars, markdown, highlight, ...rest } = loadFront(
    content.trim(),
    'markdown'
  )

  const _route = route.replace(/^\//, '')
  const arr = _route.split('/')
  const isMain = _route === '' || (arr[0] === 'index' && !arr[1])
  const fullPath = isMain ? '/' : `/${_route}`

  const config = { name, ...userConfig }

  /**
   * highlight config in page level
   */
  if (highlight) {
    config.highlight = highlight
  }

  /**
   * remarkPlugins
   */
  const pageNav = []
  const { remarkPlugins = [] } = config
  config.remarkPlugins = remarkPlugins.concat([
    math,
    katex,
    externalLinks.default || externalLinks,
    normalizeHeadings,
    slugify(arr => pageNav.push(...arr))
  ])

  const extend = { ...config.extend }
  const metaInfo = {
    ...extend.metaInfo,
    ...meta,
    title
  }
  // inject metaInfo
  extend.metaInfo = new Function(`return ${JSON.stringify(metaInfo)}`)
  // inject variables to markdown page
  extend.computed = {
    $vars: new Function(`return ${JSON.stringify(vars || {})}`),
    $page: function () {
      var currentPath = this.$route.path
      var matched = this.$pages.filter(function (info) {
        return info.path === currentPath
      })
      return matched[0] || {}
    }
  }
  config.extend = extend

  // HACK
  const vueEnv = process.env.VUE_ENV
  process.env.VUE_ENV = 'browser'
  const compiled = await md2vue(markdown, config)
  process.env.VUE_ENV = vueEnv

  const code = `(function(){
var exports = {}
var module = { epxorts: exports }
${compiled.replace(RE_REMOVE, 'false')}
return module.exports
})()`

  return { title, layout, fullPath, pageNav, content: code, rest }
}

module.exports.config = config => {
  Object.assign(userConfig, config)
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

function slugify (callback) {
  return () => ast => {
    let h2 = null
    const nav = []
    visit(ast, 'heading', visiter)
    callback(nav.filter(item => item.depth === 2))

    function visiter (node) {
      const text = toString(node)
      const slug = toSlug(text)

      if (!node.data) {
        node.data = {}
      }
      const { depth, data } = node
      ;(data.hProperties = data.hProperties || {}).id = slug
      data.id = slug

      // side effects
      if (depth === 2) {
        h2 = { depth, slug, text, children: [] }
        nav.push(h2)
      } else if (h2) {
        h2.children.push({ depth, slug, text })
      }
    }
  }
}
