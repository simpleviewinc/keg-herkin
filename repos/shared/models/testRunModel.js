const { buildModel } = require('./buildModel')

/**
 * Model for the output of tests that were run
 * @typedef TestRunModel
 * @property {string} file - Location of the test file the run is associated with
 * @property {string} testType - The type of tests that were run
 * @property {string} lastRun - The last time these tests were run
 * @property {boolean} active - Is the testRun active in the view
 * @property {boolean} running - Is the testRun currently running
 * @property {array} output - Most recent test run output
 */
const Model = {
  file: '',
  testType: '',
  lastRun: '',
  failed: false,
  active: false,
  running: false,
  output: []
}

const testRunModel = overrides => buildModel(overrides, Model)

module.exports = {
  testRunModel
}