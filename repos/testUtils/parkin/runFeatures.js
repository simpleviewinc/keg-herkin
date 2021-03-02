const { loadFeatures } = require('./loadFeatures')
const { parkin } = require('./instance')

/**
 * Runs the feature files located at herkinConfig.featuresDir.
 * This function expects that it is being called within the jest process,
 * as it ultimately calls jest globals like `describe`.
 * @param {String} featureMatch - glob-formatted string indicating paths to feature files
 * @param {Object} options 
 * @param {string?} options.name - name of feature to filter by
 * @param {Array<string>?} options.tags - array of tags to filter by
 * @return {Boolean} - whether any tests were run
 * 
 * @example
 * runFeatures(globPattern, { name: 'MyFeature'})
 */
const runFeatures = async (featureMatch, options={}) => {
  const features = loadFeatures(featureMatch)

  if (!features.length)
    throw new Error(
      `No features found at ${featureMatch}!
       Ensure your config's featuresDir path points to a path with at least one .feature file.`
    )

  const testsRan = await parkin.run(features, options)
  !testsRan && 
    console.warn(`No features matched your filters, so no tests were run. Filters:`, {
      ...(options.name && { name: options.name }),
      ...(options.tags && { tags: options.tags }),
    })
  
  return testsRan
}

module.exports = { runFeatures }