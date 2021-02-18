const glob = require('glob')
const fs = require('fs')
const path = require('path')
const { parkin } = require('./instance')
const { isArr, isObj } = require('@keg-hub/jsutils')

const { 
  DOC_APP_PATH,
  HERKIN_FEATURES_DIR 
} = process.env

/**
 * Finds all step definition files in client's step directory and
 * also in the herkin testUtils repo
 * @return {Array<string>} file paths
 */
const getFeaturePaths = () => {
  const pattern = path.join(
    DOC_APP_PATH,
    'tests',
    HERKIN_FEATURES_DIR,
    '**/*.feature'
  )

  return glob.sync(pattern)
}

/**
 * @param {string} path - path to feature
 */
const readFeature = path => {
  try {
    return fs.readFileSync(path, 'utf8')
  }
  catch (err) {
    console.error(err)
    return null
  }
}

/**
 * @return {Array<string>} array of features 
 */
const loadFeatures = () => {
  const paths = getFeaturePaths()

  return paths.reduce((features, path) => {
    const feature = readFeature(path)
    const parsed = feature && parkin.parse.feature(feature)
    const featureToPush = isArr(parsed) 
      ? parsed[0]
      : isObj(parsed)
        ? parsed
        : null
    featureToPush && features.push(featureToPush)
    return features
  }, [])
}

module.exports = { loadFeatures }