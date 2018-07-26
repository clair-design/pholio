const { resolve } = require('path')
const Cili = require('cili')
const hashSum = require('hash-sum')
const { BehaviorSubject, Observable } = require('rxjs')
const { skip } = require('rxjs/operators')

const getCacheDir = require('./get-cache-dir')
const pluginMemory = require('./rollup-plugin')
let uid = 0

module.exports = function ({
  input,
  moduleName,
  watch,
  compress,
  format = 'iife',
  extractCSS = false
}) {
  const prefix = process.env.NPM_PREFIX || process.cwd()
  const subject = new BehaviorSubject(null)
  const filename = `${process.pid}26${uid++}.js`

  const option = {
    input,
    filename,
    watch,
    moduleName,
    cwd: prefix,
    outDir: getCacheDir(),
    target: 'browser',
    js: 'babel',
    babel: { babelrc: false },
    plugin: ['require-context', 'vue'],
    format: compress ? `${format}-min` : format,
    postcss: {
      extract: extractCSS
    },
    map: false
  }

  if (typeof input === 'object') {
    option.input = resolve(prefix, input.path)
    option.plugin.push(
      pluginMemory({
        path: option.input,
        contents: input.content
      })
    )
  }

  Observable.create(async observer => {
    try {
      const emitNext = async result => {
        const ret = {}
        const [key] = Object.keys(result.bundles)
        const script = result.bundles[key].code

        ret.script = {
          content: script,
          hash: hashSum(script)
        }

        if (extractCSS) {
          const styles = [...result.cssBundles.values()].map(item => item.code)
          const content = String(styles[0])
          if (styles.length) {
            ret.styles = {
              content,
              hash: hashSum(content)
            }
          }
        }
        observer.next(ret)
      }

      const result = await Cili.write(option)
      await emitNext(result)

      if (!watch) {
        return
      }

      const { watchers } = result
      const [watcher] = watchers
      watcher.on('event', async ({ code, error }) => {
        if (code === 'ERROR' || code === 'FATAL') {
          observer.error(error)
        }

        if (code === 'BUNDLE_END') {
          await emitNext(result)
        }
      })
    } catch (error) {
      observer.error(error)
    }
  }).subscribe(subject)

  // skip the fisrt null value
  return subject.pipe(skip(1))
}
