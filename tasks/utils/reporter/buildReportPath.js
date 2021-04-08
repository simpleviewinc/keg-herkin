const path = require('path')
const { HERKIN_TESTS_ROOT, HERKIN_REPORTS_DIR } = require('HerkinBackConstants')

/**
 * Builds a path to a test report based on the type and context
 * @param {string} type - Type of tests for the report
 * @param {string} [context=type] - Name of the test the report is for
 *
 * @returns {string} - Path where the report should be created
 */
const buildReportPath = (type, context) => {
  if(!type) throw new Error(`Test type is required to build the test report path!`)

  const name = context ? context.split('/').pop() : `${type}s`
  const builtPath = path.join(HERKIN_TESTS_ROOT, HERKIN_REPORTS_DIR, `${type}/${name}.html`)

  return builtPath
}


module.exports = {
  buildReportPath
}