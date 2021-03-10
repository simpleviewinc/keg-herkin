const path = require('path')
const { getFileContent } = require('./getFileContent')
const { HERKIN_REPORTS_DIR, HERKIN_TESTS_ROOT } = require('HerkinBackConstants')
const { loadTemplate } = require(`../templates/loadTemplate`)

const getTestReportHtml = async (fileType, reportName) => {
  const reportPath = fileType &&
    reportName &&
    path.join(HERKIN_TESTS_ROOT, HERKIN_REPORTS_DIR, fileType, reportName)

  const content = reportPath && await getFileContent(reportPath)
  return content || await loadTemplate('reports404')
}

module.exports = {
  getTestReportHtml
}