const fs = require('fs')
const path = require('path')
const { apiErr, apiResponse, htmlResponse, htmlErr } = require('./handler')
const { REPORTS_PATH } = require('HerkinBackConstants')
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
    const report = await getTestReportHtml(fileType, reportName)

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