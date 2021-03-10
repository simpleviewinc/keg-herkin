const { apiResponse, htmlResponse, htmlErr } = require('./handler')
const { getTestReportHtml } = require('../utils/getTestReportHtml')

/**
 * Responds with the parkin report html as string
 * @param {Object} app - express ap
 * @param {Object} config - api config
 */
const getReportList = (app, config) => async (req, res) => {
  return apiResponse(req, res, { success: true } || {}, 200)
}

const getTestReport = (app, config) => async (req, res) => {
  try {
    const { fileType, reportName } = req.params

    // Removes .html from the name if it exists
    // Then adds it back, which allows it to work with or without the extension
    const name = `${reportName.replace('.html', '')}.html`

    const report = await getTestReportHtml(fileType, name)

    return htmlResponse(req, res, report)
  }
  catch(err){
    return htmlErr(req, res, err, err.status || 400)
  }
}

module.exports = (app, config) => {
  app.get('/reports/list', getReportList(app, config))
  app.get('/reports/:fileType', getTestReport(app, config))
  return app
}