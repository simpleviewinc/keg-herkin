const { loadFeatures } = require('./loadFeatures')
const { parkin } = require('./instance')

/**
 * Runs the feature files located at herkinConfig.featuresDir.
 * This function expects that it is being called within the jest process,
 * as it ultimately calls jest globals like `describe`.
 * @param {Object} options 
 * @param {string?} options.name - name of feature to filter by
 * @param {Array<string>?} options.tags - array of tags to filter by
 * @return {Boolean} - whether any tests were run
 */
const runFeatures = async (options={}) => {
  const features = loadFeatures()

  if (!features.length)
    throw new Error('No features found! Ensure your herkin config featuresDir path is correct and has at least one .feature file in it.')

  const testsRan = await parkin.run(features, options)
  !testsRan && 
    console.warn(`No features matched your filters, so no tests were run. Filters:`, {
      ...(options.name && { name: options.name }),
      ...(options.tags && { tags: options.tags }),
    })
  
  return testsRan
}

module.exports = { runFeatures }