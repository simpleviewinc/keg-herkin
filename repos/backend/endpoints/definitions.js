const { AppRouter } = require('HerkinAppRouter')
const { apiErr, apiResponse } = require('./handler')
const { loadDefinitions, DefinitionsParser } = require('../libs/definitions')
const { definitionsByType, fileModelArrayToObj } = require('../../shared/utils')

const getDefinitions = async (req, res) => {
  try {

    const definitions = await loadDefinitions(req.app.locals.config)
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
  AppRouter.get('/definitions', getDefinitions)
}