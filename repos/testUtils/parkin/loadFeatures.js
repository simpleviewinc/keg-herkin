const glob = require('glob')
const fs = require('fs')

/**
 * Finds all step definition files in client's step directory and
 * also in the herkin testUtils repo
 * @return {Array<string>} file paths
 */
const getFeaturePaths = pattern => {
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
 * @param {string} globPattern - glob pattern pointing to feature files
 * @return {Array<string>} array of features as strings
 */
const loadFeatures = globPattern => {
  const paths = getFeaturePaths(globPattern)
  return paths.map(readFeature).filter(Boolean)
}

module.exports = { loadFeatures }