const bunyan = require('bunyan')

module.exports = bunyan.createLogger({
  name: 'Pholio',
  stream: process.stdout,
  level: 'info',
  serializers: bunyan.stdSerializers
})
