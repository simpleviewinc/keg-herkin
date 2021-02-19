const path = require('path')
const { runFeatures } = require('HerkinRepos/testUtils/parkin/runFeatures')
const { TESTS_MOUNT } = require('HerkinBackConstants')

const { 
  HERKIN_FEATURES_DIR,
  HERKIN_FEATURE_NAME,
  HERKIN_FEATURE_TAGS,
  HERKIN_FEATURE_GLOB='**/*.feature'
} = process.env

const featureMatchingPath = path.join(
  TESTS_MOUNT,
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