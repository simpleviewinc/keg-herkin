const { apiErr, apiResponse } = require('./handler')
const { loadFeatures } = require('../libs/features')
const { loadDefinitions } = require('../libs/definitions')

const testData = (app, config) => async (req, res) => {
  try {

    const definitions = await loadDefinitions(config)
    const features = await loadFeatures(config, definitions)

    return apiResponse(req, res, { features, definitions }, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

module.exports = (app, config) => {
  app.get('/bdd', testData(app, config))

  return app
}