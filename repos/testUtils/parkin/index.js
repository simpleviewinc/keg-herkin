const { loadFeatures } = require('./loadFeatures')
const { runFeatures } = require('./runFeatures')
const hookFunctions = require('./hooks')
const stepFunctions = require('./stepFunctions')

module.exports = {
  ...stepFunctions,
  ...hookFunctions,
  loadFeatures,
  runFeatures,
}