const path = require('path')
const glob = require('glob')
const { apiErr, apiResponse } = require('./handler')
const { StepParser } = require('../libs')

const loadStepFiles = (stepsFolder) => {
  return new Promise((res, rej) => {
    glob(path.join(stepsFolder, '**/*.js'), {}, async (err, files=[]) => {
      err || !files
        ? rej('No step files found in ' + stepsFolder)
        : res(files)
    })
  })
}

const parseSteps = (stepFiles) => {
  return stepFiles.reduce(async (toResolve, file) => {
    const loaded = await toResolve
    if(!file) return loaded

    const steps = await StepParser.getSteps(file)

    return loaded.concat(steps)
  }, Promise.resolve([]))
}

const getSteps = (app, config) => async (req, res) => {
  try {
    const { stepsFolder } = config.editor

    const stepFiles = stepsFolder && await loadStepFiles(stepsFolder)
    const steps = stepFiles && await parseSteps(stepFiles)

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