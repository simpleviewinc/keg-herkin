const { wordCaps } = require('@keg-hub/jsutils')

/**
 * Builds a title of a test report based on the type and context
 * @param {string} type - Type of tests for the report
 * @param {string} [context=type] - Name of the test the report is for
 *
 * @returns {string} - Path where the report should be created
 */
const buildReportTitle = (type, context) => {
  const name = context && context.split('/').pop()
  const builtName = name ? wordCaps(name) : type ? `${wordCaps(type)} Test Suite` : `Test Suite`

  return builtName
}

module.exports = {
  buildReportTitle
}