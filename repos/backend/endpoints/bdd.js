const { apiErr, apiResponse } = require('./handler')
const { loadFeatures } = require('../libs/features')
const { loadDefinitions, DefinitionsParser } = require('../libs/definitions')
const { definitionsByType, fileModelArrayToObj } = require('../../shared/utils')

const loadBddFiles = (app, config) => async (req, res) => {
  try {
    const definitions = await loadDefinitions(config)
    const definitionTypes = definitionsByType(definitions)
    const features = await loadFeatures(config, definitionTypes)

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
  app.get('/bdd', loadBddFiles(app, config))

  return app
}