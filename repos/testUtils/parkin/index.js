const hookFunctions = require('./hooks')
const stepFunctions = require('./stepFunctions')

module.exports = {
  ...stepFunctions,
  ...hookFunctions,
}