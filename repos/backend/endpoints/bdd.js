const { apiErr, apiResponse } = require('./handler')
const { loadFeatures } = require('../libs/features')
const { loadDefinitions, DefinitionsParser } = require('../libs/definitions')
const { definitionsByType, fileModelArrayToObj } = require('../../shared/utils')

const testData = (app, config) => async (req, res) => {
  try {
    const definitions = await loadDefinitions(config)
    const definitionTypes = definitionsByType(definitions)
    const features = await loadFeatures(config, definitionTypes)

    // Reset the cached definitions
    DefinitionsParser.resetDefinitions()

    return apiResponse(req, res, { 
      features: fileModelArrayToObj(features), 
      definitions: fileModelArrayToObj(definitions), 
      definitionTypes 
    }, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

module.exports = (app, config) => {
  app.get('/bdd', testData(app, config))

  return app
}