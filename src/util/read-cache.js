/**
 * original: https://github.com/TrySound/read-cache/blob/master/index.js
 */
const pick = require('lodash/pick')
const hashSum = require('hash-sum')
const { stat, readFile } = require('fs-extra')
const LRU = require('./lru')

const kResultKeys = ['hash', 'content']
const convert = item => pick(item, kResultKeys)

let kCache = null
const kCacheOption = {
  // 200 keys
  max: 200,
  // 1 hour
  maxAge: 1000 * 60 * 60
}

module.exports = async path => {
  // LRU: run time only, do not cache to disk
  kCache = kCache || (await LRU(kCacheOption))

  try {
    const { mtime } = await stat(path)
    const item = kCache[path]

    if (item && item.mtime.getTime() === mtime.getTime()) {
      return convert(item)
    }

    const content = await readFile(path, 'utf-8')

    kCache[path] = {
      mtime,
      content,
      hash: hashSum(content)
    }

    return convert(kCache[path])
  } catch (e) {
    kCache[path] = null
    return e
  }
}

module.exports.get = function (path) {
  return kCache[path] || null
}

module.exports.clear = function () {
  kCache.reset()
}
