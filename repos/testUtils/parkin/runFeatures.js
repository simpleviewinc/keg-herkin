const { loadFeatures } = require('./loadFeatures')
const { parkin } = require('./instance')

/**
 * Run this inside a jest process, as it creates `describe` blocks
 * @param {Object} options 
 * @param {string?} options.name - name of feature to filter by
 * @param {Array<string>?} options.tags - array of tags to filter by
 */
const runFeatures = async (options={}) => {
  const features = loadFeatures()

  if (!features.length)
    throw new Error('No features found! Ensure your herkin config featuresDir path is correct.')

  const testsRan = await parkin.run(features, options)
  if (!testsRan)
    console.warn(`No tests were run, using filters:`, {
      ...(options.name && { name: options.name }),
      ...(options.tags && { tags: options.tags }),
    })
}

module.exports = { runFeatures }