const { join } = require('path')
const emballer = require('emballer')
const { skip } = require('rxjs/operators')
const { BehaviorSubject, Observable } = require('rxjs')

const getCacheDir = require('./getCacheDir')
const readCachedFile = require('./readCache')

let uid = 0

module.exports = function ({
  input,
  watch,
  moduleName,
  compress,
  format = 'iife'
}) {
  const env = process.env.NODE_ENV || 'development'
  const subject = new BehaviorSubject(null)
  const file = `${env}_${uid++}`
  const tempScript = join(getCacheDir(), 'temp', `${file}.js`)
  const tempStyles = join(getCacheDir(), 'temp', `${file}.css`)

  const option = {
    input,
    output: [
      {
        format: format,
        name: moduleName,
        file: tempScript
      }
    ],
    postcss: {
      minimize: !!compress,
      extract: tempStyles
    },
    map: false,
    uglify: !!compress
  }

  if (typeof input === 'object') {
    option.input = {
      path: input.path,
      contents: input.content
    }
  }

  Observable.create(async observer => {
    try {
      const emitNext = async () => {
        observer.next({
          script: await readCachedFile(tempScript),
          styles: await readCachedFile(tempStyles)
        })
      }

      const [watcher] = await emballer({ options: [option] }, watch)
      watcher.on('event', ({ code, error }) => {
        if (code === 'ERROR' || code === 'FATAL') {
          observer.error(error)
        }
        if (code === 'BUNDLE_END') {
          emitNext().then(() => {
            if (!watch) {
              watcher.close()
            }
          })
        }
      })
    } catch (error) {
      observer.error(error)
    }
  }).subscribe(subject)

  // skip the fisrt null value
  return subject.pipe(skip(1))
}
