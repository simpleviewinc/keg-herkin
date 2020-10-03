const { apiErr, apiResponse } = require('./handler')
const { loadFeatures } = require('../libs/features')
const { loadSteps } = require('../libs/steps')

const testData = (app, config) => async (req, res) => {
  try {

    // TODO: write method to map feature steps to loaded steps
    // This will allow reference to the parameters
    // May be better to parse the steps first, then pass them into the features
    // this way we can search the step definitions when parsing the steps of a feature
    const features = await loadFeatures(config)
    const steps = await loadSteps(config)
    
    return apiResponse(req, res, { features, steps }, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

module.exports = (app, config) => {
  app.get('/testData', testData(app, config))

  return app
}