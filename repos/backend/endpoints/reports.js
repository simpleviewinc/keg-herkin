const { apiErr, apiResponse } = require('./handler')
const { REPORTS_PATH } = require('HerkinBackConstants')
const fs = require('fs')
const path = require('path')

/**
 * Responds with the parkin report html as string
 * @param {Object} app - express ap
 * @param {Object} config - api config
 */
const getParkinReport = (app, config) => async (req, res) => {
  try {
    const reportPath = path.join(REPORTS_PATH, 'parkin-report.html')
    const report = fs.readFileSync(reportPath, 'utf8')
    res.set('Content-Type', 'text/html')
    res.send(report)
  }
  catch(err){
    return apiErr(req, res, err, err.status || 400)
  }
}

module.exports = (app, config) => {
  app.get('/reports/parkin', getParkinReport(app, config))
  return app
}