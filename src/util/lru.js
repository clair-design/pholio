/**
 * persistant LRU cache
 */
const { resolve } = require('path')
const LRU = require('lru-cache')
const { exists, ensureFile, readFile, writeFile } = require('fs-extra')

const envPath = process.env.LRU_CACHE_PATH
const kCacheDir = envPath || resolve(process.cwd(), '.cache')

module.exports = async (filename, option) => {
  const cache = LRU(option)

  // do not use disk cache
  if (typeof filename !== 'string') {
    return cache
  }

  const file = resolve(kCacheDir, filename)

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
