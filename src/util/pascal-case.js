const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')
const flowRight = require('lodash/flowRight')

module.exports = flowRight(upperFirst, camelCase)
