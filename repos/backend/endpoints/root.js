const { AppRouter } = require('HerkinAppRouter')
const { apiErr, apiResponse } = require('./handler')

const apiRoot = (req, res) => {

  try {
    const config = req.app.locals.config
    return apiResponse(req, res, {
      host: config.server.host,
      port: config.server.port
    }, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }

}

module.exports = () => {
  AppRouter.get('/', apiRoot)
}