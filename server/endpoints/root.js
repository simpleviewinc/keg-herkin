const { apiErr, apiResponse } = require('./handler')

const apiRoot = (app, config) => (req, res) => {
  return apiResponse(req, res, {
    host: config.server.host,
    port: config.server.port
  }, 200)
}

module.exports = (app, config) => {
  app.get('/', apiRoot(app, config))

  return app
}