const { resolve } = require('path')
let cacheDir = null

module.exports = () => {
  if (cacheDir === null) {
    cacheDir =
      process.env.CACHE_PATH ||
      resolve(process.env.NPM_PREFIX || process.cwd(), '.cache')
  }

  return cacheDir
}
