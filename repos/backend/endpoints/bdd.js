const { apiErr, apiResponse } = require('./handler')
const { loadFeatures } = require('../libs/features')
const { definitionsByType } = require('../utils/definitionsByType')
const { loadDefinitions } = require('../libs/definitions')

const testData = (app, config) => async (req, res) => {
  try {
    const definitions = await loadDefinitions(config)
    const definitionTypes = definitionsByType(definitions)
    const features = await loadFeatures(config, definitionTypes)

    return apiResponse(req, res, { features, definitions, definitionTypes }, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

module.exports = (app, config) => {
  app.get('/bdd', testData(app, config))

  return app
}