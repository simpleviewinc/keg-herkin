const { runFeatures } = require('HerkinRepos/testUtils/parkin/runFeatures')

/**
 * Runs feature tests in the test volume mount, in the directory indicated by herkinConfig.featuresDir.
 * @see `tasks/definitions/cucumber/run.js for how this script gets called`
 */
runFeatures({
  name: process.env.HERKIN_FEATURE_NAME,
  tags: process.env.HERKIN_FEATURE_TAGS
})