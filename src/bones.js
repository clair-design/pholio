const { join, resolve } = require('path')

const hasSum = require('hash-sum')
const tempDir = require('temp-dir')
const emballer = require('emballer')
const { from, Subject } = require('rxjs')

const renderFile = require('./util/render-file')
const kTemplate = resolve(__dirname, '../template/bones.js')
const kTempFile = join(tempDir, `rollup_bundle_bones_dev_null_${process.pid}`)

module.exports = function ({ pluginDirectory, layoutDirectory }) {
  // fallback
  let latest = null
  const subject = new Subject()

  // this is a virtual path
  // pluginDirectory & layoutDirectory got normalized in this way
  const path = resolve(process.env.NPM_PREFIX || process.cwd(), './bones.js')

  const input = { path, contents: null }

  const output = {
    format: 'iife',
    strict: true,
    sourcemap: false
  }

  // don't bother to take externals (common modules) into account
  // since that is not the usual way
  const options = [
    {
      input,
      output: {
        ...output,
        file: kTempFile
      },
      postcss: {
        extract: false
      }
    }
  ]

  const entry$ = from(
    renderFile(kTemplate, {
      pluginDirectory,
      layoutDirectory
    })
  )

  entry$.subscribe(async content => {
    input.contents = content

    try {
      const [watcher] = await emballer({ options }, true)

      watcher.on('event', async event => {
        const { code, result } = event

        if (code === 'BUNDLE_END') {
          const { code } = await result.generate(output)

          latest = {
            content: code,
            hash: hasSum(code)
          }

          subject.next(latest)
        }

        if (event.error) {
          if (latest) {
            subject.next(latest)
          }

          // TODO
          // report error
          console.error(event.error)
        }
      })
    } catch (e) {
      // TODO
      // report error
      console.error(e)
    }
  })

  return subject
}
