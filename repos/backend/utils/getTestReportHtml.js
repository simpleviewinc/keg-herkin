const path = require('path')
const { getFileContent } = require('./getFileContent')
const { REPORTS_PATH } = require('HerkinBackConstants')
const { loadTemplate } = require(`../templates/loadTemplate`)

const getTestReportHtml = async (fileType, reportName) => {
  const reportPath = fileType &&
    reportName &&
    path.join(REPORTS_PATH, fileType, reportName)

  const content = reportPath && await getFileContent(reportPath)
  return content || await loadTemplate('reports404')
}

module.exports = {
  getTestReportHtml
}