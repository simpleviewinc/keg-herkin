const path = require('path')
const glob = require('glob')
const { limbo, noPropArr } = require('@keg-hub/jsutils')
const { featuresParser } = require('./featuresParser')
const { buildFileModel } = require('../../utils/buildFileModel')

/**
 * Loads feature files base on the passed in features directory
 * @function
 * @private
 * @param {string} featuresDir - Location where feature files can be found
 *
 * @returns {Promise<Array<string>>} - Found feature file paths
 */
const loadFeatureFiles = featuresDir => {
  return new Promise((res, rej) => {
    glob(path.join(featuresDir, '**/*.feature'), {}, async (err, files=[]) => {
      err || !files
        ? rej('No feature files found in ' + featuresDir)
        : res(files)
    })
  })
}

/**
 * Makes call to parse feature files, and convert them into Parkin feature AST objects
 * @function
 * @private
 * @param {Array<string>} featureFiles - feature file paths
 * @param {string} testsRoot - Path to the root test directory
 *
 * @returns {Promise<Array<string>>} - Group of parsed feature file AST Objects including their location
 */
const parseFeatures = (featureFiles, testsRoot) => {
  return featureFiles.reduce(async (toResolve, file) => {
    const loaded = await toResolve
    if(!file) return loaded

    const [err, features=noPropArr] = await limbo(featuresParser({
      location: file,
      relative: file.replace(`${testsRoot}/`, '')
    }))

    err &&
      console.error(
        `Error parsing ${file}\n`,
        `This feature file will be skipped!\n`,
        error.message
      )

    return features ? loaded.concat(features) : loaded
  }, Promise.resolve([]))
}

/**
 * Loads features files from the file system as File Model objects
 * Then maps the passed in definitions to the Feature steps
 * @function
 * @export
 * @param {Object} config - Herkin Config object
 * @param {Array<Object>} definitions - Loaded definitions
 *
 * @returns {Promise<Array<string>>} - Group of parsed feature files as FileModel objects
 */
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

  /**
   * TODO: Add mapping of definitions to features using Parkin
   * Would look something like this
    features.map(feature => {
      feature.scenarios.map(scenario => {
          scenario.steps.map(step => {
            const def = parkin.steps.match(step.step)
            def && step.definition = def
          })
      })
   })
  */

  const featuresFiles = features.map(async feat => {
    const { relative, location, content, feature, ...ast } = feat
    return await buildFileModel({
      ast,
      content,
      location,
      fileType: 'feature',
    })
  })

  return Promise.all(featuresFiles)

}

module.exports = {
  loadFeatures,
}