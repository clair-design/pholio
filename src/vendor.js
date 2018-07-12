const { resolve } = require('path')

const { from } = require('rxjs')
const hashSum = require('hash-sum')
const embaler = require('emballer')
const { readFile } = require('fs-extra')

const LRU = require('./util/lru')

let kCache = null
const kCacheName = 'vendor.json'
const kCacheOption = { maxAge: 1000 * 60 * 60 * 24 * 7 }

const kEntry = resolve(__dirname, 'server/ssr-common.js')

const rollup = async function () {
  kCache = kCache || (await LRU(kCacheName, kCacheOption))

  const env = process.env.NODE_ENV || 'development'
  const isProd = env === 'production'

  const content = await readFile(kEntry)
  const hash = hashSum(content)
  const key = `${env}_${hash}`
  const hit = kCache.get(key)

  if (hit) {
    return hit
  }

  const option = {
    input: kEntry,
    output: {
      name: 'createApp',
      format: 'iife',
      sourcemap: !isProd ? 'inline' : false
    },
    uglify: isProd,
    postcss: false
  }

  // potential errors are ignored, which is acceptable here
  const result = await embaler({ options: [option] })
  const [{ code }] = result[0]
  const ret = {
    content: code,
    hash: hashSum(code)
  }

  kCache.set(key, ret)
  kCache.save()

  return ret
}

module.exports = function () {
  return from(rollup())
}
