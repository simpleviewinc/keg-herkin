const { apiErr, apiResponse } = require('./handler')
const { loadSteps } = require('../libs/steps')

const getSteps = (app, config) => async (req, res) => {
  try {

    const steps = await loadSteps(config)

    return apiResponse(req, res, steps || [], 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }

}

module.exports = (app, config) => {
  app.get('/steps', getSteps(app, config))

  return app
}