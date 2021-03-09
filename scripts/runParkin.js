const path = require('path')
const { runFeatures } = require('HerkinRepos/testUtils/parkin/runFeatures')
const { HERKIN_TESTS_ROOT } = require('HerkinBackConstants')

const { 
  HERKIN_FEATURES_DIR,
  HERKIN_FEATURE_NAME,
  HERKIN_FEATURE_TAGS,
  HERKIN_FEATURE_GLOB='**/*.feature'
} = process.env

const featureMatchingPath = path.join(
  HERKIN_TESTS_ROOT,
  HERKIN_FEATURES_DIR,
  HERKIN_FEATURE_GLOB
)

/**
 * Runs feature tests in the test volume mount, in the directory indicated by herkinConfig.featuresDir.
 * @see `tasks/definitions/cucumber/run.js for how this script gets called`
 */
runFeatures(
  featureMatchingPath,
  {
    name: HERKIN_FEATURE_NAME,
    tags: HERKIN_FEATURE_TAGS
  }
)