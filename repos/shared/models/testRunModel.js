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
  exitCode: undefined,
  failed: false,
  active: false,
  running: false,
  command: undefined,
  params: [],
  messages: {}
}

const testRunModel = overrides => buildModel(overrides, Model)

module.exports = {
  testRunModel
}