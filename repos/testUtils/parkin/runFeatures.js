const { loadFeatures } = require('./loadFeatures')
const { parkin } = require('./instance')
const { clientHooks } = require('./hooks')

/**
 * Run this inside a jest process, as it creates `describe` blocks
 */
const runFeatures = () => {
  try {
    clientHooks.BeforeAll()
    const features = loadFeatures()
    parkin.run(features)
  }
  finally {
    clientHooks.AfterAll()
  }
}

module.exports = { runFeatures }