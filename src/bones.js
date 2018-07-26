const { resolve } = require('path')
const { from, BehaviorSubject } = require('rxjs')
const { skip } = require('rxjs/operators')

const cili = require('./util/cili')
const renderFile = require('./util/render-file')
const kTemplate = resolve(__dirname, '../template/bones.js')

module.exports = function ({ pluginDirectory, layoutDirectory }) {
  const subject = new BehaviorSubject(null)

  // this is a virtual path
  // pluginDirectory & layoutDirectory got normalized in this way
  const path = resolve(process.env.NPM_PREFIX || process.cwd(), './bones.js')

  from(
    renderFile(kTemplate, {
      pluginDirectory,
      layoutDirectory
    })
  ).subscribe(async content => {
    const isProd = process.env.NODE_ENV === 'production'

    cili({
      input: { path, content },
      watch: !isProd,
      compress: isProd,
      extractCSS: isProd
    }).subscribe(subject)
  })

  return subject.pipe(skip(1))
}
