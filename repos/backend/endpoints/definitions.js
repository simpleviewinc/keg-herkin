const { apiErr, apiResponse } = require('./handler')
const { loadDefinitions } = require('../libs/definitions')

const getDefinitions = (app, config) => async (req, res) => {
  try {

    const steps = await loadDefinitions(config)

    return apiResponse(req, res, steps || [], 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }

}

module.exports = (app, config) => {
  app.get('/definitions', getDefinitions(app, config))

  return app
}