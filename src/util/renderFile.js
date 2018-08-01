const { promisify } = require('util')
const renderFile = promisify(require('ejs').renderFile)

module.exports = renderFile
