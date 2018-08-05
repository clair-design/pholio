const md2vue = require('./markdown')
const LRU = require('../util/lru')
const readCachedFile = require('../util/readCache')
const assign = Object.assign

let kCache = null
const kCacheName = 'markdown2vue.json'
const kCacheOption = {
  max: 500,
  // an hour
  maxAge: 1000 * 60 * 60
}

module.exports = async file => {
  kCache = kCache || (await LRU(kCacheName, kCacheOption))

  const fallback = kCache.get(file)

  try {
    const result = await readCachedFile(file)
    if (result instanceof Error) {
      throw result
    }

    const { hash } = result
    const cached = kCache.get(hash)

    // HIT
    if (cached) {
      return cached
    }

    const ret = await md2vue(file)
    const data = assign({ hash }, ret)
    const expires = Date.now() + 30 * 60 * 1000

    kCache.set(hash, data, expires) // for cache
    kCache.set(file, data, expires) // for error fallback
    kCache.save()

    return data
  } catch (e) {
    // TODO
    // report error
    console.error(e)

    if (fallback) {
      return fallback
    }
    return null
  }
}
