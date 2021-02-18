const { loadFeatures } = require('./loadFeatures')
const { runFeatures } = require('./runFeatures')
const { BeforeAll, AfterAll } = require('./hooks')
const stepFunctions = require('./stepFunctions')

module.exports = {
  ...stepFunctions,
  BeforeAll,
  AfterAll,
  loadFeatures,
  runFeatures,
}