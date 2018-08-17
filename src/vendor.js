const { resolve } = require('path')
const { BehaviorSubject } = require('rxjs')
const { skip } = require('rxjs/operators')
const hashSum = require('hash-sum')
const { readFile } = require('fs-extra')

const LRU = require('./util/lru')
const cili = require('./util/cili')

let kCache = null
const kCacheName = 'vendor.json'
const kCacheOption = { maxAge: 1000 * 60 * 60 * 24 * 7 }

const kEntry = resolve(__dirname, 'server/ssr-common.js')

const subscribe = async function (subject) {
  kCache = kCache || (await LRU(kCacheName, kCacheOption))

  const env = process.env.NODE_ENV || 'development'
  const isProd = env === 'production'

  const content = await readFile(kEntry)
  const hash = hashSum(content)
  const key = `${env}_${hash}`
  const hit = kCache.get(key)

  if (hit) {
    return subject.next(hit)
  }

  cili({
    input: kEntry,
    moduleName: 'createApp',
    extractCSS: false,
    watch: !isProd
  }).subscribe(result => {
    const ret = result.script
    kCache.set(key, ret)
    kCache.save()
    subject.next(ret)
  })
}

module.exports = function () {
  const subject = new BehaviorSubject(null)
  subscribe(subject)
  return subject.pipe(skip(1))
}
