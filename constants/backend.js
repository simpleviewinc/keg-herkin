const path = require('path')
const { getRepoPaths } = require('./repos')
const { execSync } = require('child_process')
const { snakeCase, deepFreeze } = require('@keg-hub/jsutils')
const { HERKIN_ROOT, ...repoPaths } = getRepoPaths()

// absolute path to tests volume inside the container
const dockerTestsRoot = path.join(HERKIN_ROOT, 'tests')

const {
  DOC_APP_PATH,
  HERKIN_TESTS_ROOT,
  HERKIN_FEATURES_DIR,
  HERKIN_STEPS_DIR,
  HERKIN_SUPPORT_DIR,
  HERKIN_UNIT_DIR,
  HERKIN_WAYPOINT_DIR,
} = process.env

// absolute path to the tests folder on host machine
const hostTestsRoot = HERKIN_TESTS_ROOT || dockerTestsRoot

/**
 * Constants that should only be imported in a node runtime environment, the backend
 */
module.exports = deepFreeze({
  HERKIN_ROOT: HERKIN_ROOT,
  REPORTS_PATH: path.join(HERKIN_ROOT, 'reports'),
  // if DOC_APP_PATH, we are a docker container, so look for tests at <herkin-root>/tests
  HERKIN_TESTS_ROOT: DOC_APP_PATH ? dockerTestsRoot : hostTestsRoot,
  HERKIN_FEATURES_DIR: HERKIN_FEATURES_DIR || 'bdd/features',
  HERKIN_STEPS_DIR: HERKIN_STEPS_DIR || 'bdd/steps',
  HERKIN_SUPPORT_DIR: HERKIN_SUPPORT_DIR || 'bdd/support',
  HERKIN_UNIT_DIR: HERKIN_UNIT_DIR || 'unit',
  HERKIN_WAYPOINT_DIR: HERKIN_WAYPOINT_DIR || 'waypoint',
  ...repoPaths,
})