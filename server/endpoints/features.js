const { apiErr, apiResponse } = require('./handler')
const { loadFeatures } = require('../libs/features')

const getFeatures = (app, config) => async (req, res) => {
  try {

    const features = await loadFeatures(config)

    return apiResponse(req, res, features || [], 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }

}

module.exports = (app, config) => {
  app.get('/features', getFeatures(app, config))

  return app
}