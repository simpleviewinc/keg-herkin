const path = require('path')
const glob = require('glob')
const { mapToSteps } = require('./mapToSteps')
const { FeatureParser } = require('./featureParser')
const { buildFileModel } = require('../../utils/buildFileModel')

const loadFeatureFiles = featuresDir => {
  return new Promise((res, rej) => {
    glob(path.join(featuresDir, '**/*.feature'), {}, async (err, files=[]) => {
      err || !files
        ? rej('No feature files found in ' + featuresDir)
        : res(files)
    })
  })
}

const parseFeatures = (featureFiles, testsRoot) => {
  return featureFiles.reduce(async (toResolve, file) => {
    const loaded = await toResolve
    if(!file) return loaded

    const features = await FeatureParser.getFeatures({
      location: file,
      relative: file.replace(`${testsRoot}/`, '')
    })

    return loaded.concat(features)
  }, Promise.resolve([]))
}

const loadFeatures = async (config, definitions) => {
  const { featuresDir, testsRoot } = config.paths
  if (!featuresDir || !testsRoot)
    throw new Error(
      `Herkin config featuresDir and testsRoot must be defined. Found: 
        - featuresDir=${featuresDir}
        - testsRoot=${testsRoot}
      `
    )
  const pathToFeatures = path.join(testsRoot, featuresDir)
  const featureFiles = featuresDir && await loadFeatureFiles(pathToFeatures)
  const features = await parseFeatures(featureFiles, pathToFeatures)

  const featuresWDefs = definitions
    ? mapToSteps(features, definitions)
    : features
  
  const featuresFiles = featuresWDefs.map(async feat => {
    const { relative, location, content, feature, ...ast } = feat
    return await buildFileModel({
      ast,
      content,
      location,
    })
  })

  return Promise.all(featuresFiles)

}

module.exports = {
  loadFeatures,
  loadFeatureFiles,
  mapToSteps,
  parseFeatures,
  FeatureParser
}