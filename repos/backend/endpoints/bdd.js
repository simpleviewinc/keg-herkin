const { AppRouter } = require('HerkinAppRouter')
const { apiErr, apiResponse } = require('./handler')
const { loadFeatures } = require('../libs/features')
const { loadDefinitions, DefinitionsParser } = require('../libs/definitions')
const { definitionsByType, fileModelArrayToObj } = require('../../shared/utils')

const loadBddFiles = async (req, res) => {
  try {
    const definitions = await loadDefinitions(req.app.locals.config)
    const definitionTypes = definitionsByType(definitions)
    const features = await loadFeatures(req.app.locals.config, definitionTypes)

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

module.exports = () => {
  AppRouter.get('/bdd', loadBddFiles)
}