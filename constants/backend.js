const path = require('path')
const { getRepoPaths } = require('./repos')
const { dirsFromEnvs } = require('./dirsFromEnvs')
const { getTestTypes } = require('./getTestTypes')
const { deepFreeze } = require('@keg-hub/jsutils')

const { DOC_APP_PATH, HERKIN_TESTS_ROOT } = process.env
const { HERKIN_ROOT, ...repoPaths } = getRepoPaths()

// absolute path to tests volume inside the container
const dockerTestsRoot = path.join(HERKIN_ROOT, 'tests')
// absolute path to the tests folder on host machine
const hostTestsRoot = HERKIN_TESTS_ROOT || dockerTestsRoot
// Set the test root based on if DOC_APP_PATH is set ( In a docker container )
const testsRoot = DOC_APP_PATH ? dockerTestsRoot : hostTestsRoot

/**
 * Constants that should only be imported in a node runtime environment, the backend
 */
module.exports = deepFreeze({
  HERKIN_ROOT: HERKIN_ROOT,
  // if DOC_APP_PATH, we are a docker container, so look for tests at <herkin-root>/tests
  HERKIN_TESTS_ROOT: testsRoot,
  TEST_TYPES: getTestTypes(testsRoot, dirsFromEnvs),
  ...dirsFromEnvs,
  ...repoPaths,
})