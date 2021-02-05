const { StepParser } = require('../libs')
const { apiErr, apiResponse } = require('./handler')

const getComponents = (app, config) => async (req, res) => {
  try {
    const { componentsFile } = config.paths
    const components = componentsFile && await StepParser.getComponents(componentsFile)

    return apiResponse(req, res, components || [], 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}


module.exports = (app, config) => {
  app.get('/components', getComponents(app, config))

  return app
}