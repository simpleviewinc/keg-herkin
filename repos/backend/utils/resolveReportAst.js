const path = require('path')

/**
 * Checks if a path is in the reports folder
 * If it is, then build an ast object with the testType
 * @param {string} fullPath - Full path to the file to check
 * @param {string} testsRoot - Root location of test files
 * @param {string} reportsDir - Directory where reports are stored
 *
 * @returns {Object} - Reports ast || empty object
 */
const resolveReportAst = (fullPath, testsRoot, reportsDir) => {
  return fullPath.startsWith(path.join(testsRoot, reportsDir))
    ? { 
        ast: {
          testType: fullPath.split(`${reportsDir}/`).pop().split('/').shift(),
          reportUrl: fullPath.replace(testsRoot, '')
        }
      }
    : {}
}

module.exports = {
  resolveReportAst
}