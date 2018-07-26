/**
 * persistant LRU cache
 */
const { resolve } = require('path')
const LRU = require('lru-cache')
const { exists, ensureFile, readFile, writeFile } = require('fs-extra')
const getCacheDir = require('./get-cache-dir')

module.exports = async (filename, option) => {
  const cacheDir = getCacheDir()
  const cache = LRU(option)

  // do not use disk cache
  if (typeof filename !== 'string') {
    return cache
  }

  const file = resolve(cacheDir, filename)

  if (await exists(file)) {
    try {
      const content = await readFile(file, 'utf-8')
      cache.load(JSON.parse(content))
    } catch (e) {
      // if error while parsing cached contents
      // just empty that file
      await writeFile(file, '')
    }
  } else {
    await ensureFile(file)
  }

  cache.save = () => {
    writeFile(file, JSON.stringify(cache.dump()))
  }

  return cache
}
