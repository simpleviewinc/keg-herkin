const { apiErr, apiResponse } = require('./handler')
const { loadSteps } = require('../libs/definitions')

const getDefinitions = (app, config) => async (req, res) => {
  try {

    const steps = await loadSteps(config)

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