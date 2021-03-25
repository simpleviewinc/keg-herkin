const { apiErr, apiResponse } = require('./handler')
const { parkin } = require('HerkinParkin/instance')
const { loadDefinitions, DefinitionsParser } = require('../libs/definitions')
const { definitionsByType, fileModelArrayToObj } = require('../../shared/utils')

const getDefinitions = (app, config) => async (req, res) => {
  try {

    const definitions = await loadDefinitions(config)
    const definitionTypes = definitionsByType(definitions)

    return apiResponse(req, res, {
      definitionTypes,
      definitions: fileModelArrayToObj(definitions), 
    }, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }

}

module.exports = (app, config) => {
  app.get('/definitions', getDefinitions(app, config))

  return app
}