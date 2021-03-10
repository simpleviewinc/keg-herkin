const { wordCaps } = require('@keg-hub/jsutils')

/**
 * Builds a title of a test report based on the type and context
 * @param {string} type - Type of tests for the report
 * @param {string} [context=type] - Name of the test the report is for
 *
 * @returns {string} - Path where the report should be created
 */
const buildReportTitle = (type='Test', context) => {
  const name = context ? context.split('/').pop() : type
  return type !== 'Test'
    ? wordCaps(`${name} - ${type}s Test Suite`)
    : `Test Suite`
}

module.exports = {
  buildReportTitle
}