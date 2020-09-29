const path = require('path')
const glob = require('glob')
const { apiErr, apiResponse } = require('./handler')
const { FeatureParser } = require('../libs')

const loadFeatureFiles = (featuresFolder) => {
  return new Promise((res, rej) => {
    glob(path.join(featuresFolder, '**/*.feature'), {}, async (err, files=[]) => {
      err || !files
        ? rej('No feature files found in ' + featuresFolder)
        : res(files)
    })
  })
}

const parseFeatures = (featureFiles) => {
  return featureFiles.reduce(async (toResolve, file) => {
    const loaded = await toResolve
    if(!file) return loaded

    const features = await FeatureParser.getFeatures(file)

    return loaded.concat(features)
  }, Promise.resolve([]))
}

const getFeatures = (app, config) => async (req, res) => {
  try {
    const { featuresFolder } = config.editor

    const featureFiles = featuresFolder && await loadFeatureFiles(featuresFolder)
    const features = featureFiles && await parseFeatures(featureFiles)

    return apiResponse(req, res, features || [], 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }

}

module.exports = (app, config) => {
  app.get('/features', getFeatures(app, config))

  return app
}