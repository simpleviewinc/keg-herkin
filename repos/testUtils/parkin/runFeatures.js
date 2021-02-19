const { loadFeatures } = require('./loadFeatures')
const { parkin } = require('./instance')

/**
 * Run this inside a jest process, as it creates `describe` blocks
 */
const runFeatures = async () => {
  const features = loadFeatures()
  parkin.run(features)
}

module.exports = { runFeatures }