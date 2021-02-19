const glob = require('glob')
const fs = require('fs')
const path = require('path')

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
 * @return {string?} the feature content as string
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
 * @return {Array<string>} array of features as strings
 */
const loadFeatures = () => {
  const paths = getFeaturePaths()
  return paths.map(readFeature)
}

module.exports = { loadFeatures }