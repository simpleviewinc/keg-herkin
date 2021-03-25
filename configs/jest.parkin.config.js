const { jestAliases } = require('./aliases.config')
const { getHerkinConfig } = require('./getHerkinConfig')
const { TEST_UTILS_PATH, HERKIN_ROOT, HERKIN_REPORTS_DIR } = require('../constants/backend')
const { uniqArr } = require('@keg-hub/jsutils')
const path = require('path')
const glob = require('glob')

const mountPoint = path.join(HERKIN_ROOT, 'tests')

const config = getHerkinConfig()

/**
 * Finds all step definition files in client's step directory and
 * also in the herkin testUtils repo
 * @return {Array<string>} file paths
 */
const getStepDefinitions = () => {
  const clientPattern = path.join(
    mountPoint, 
    config.paths.stepsDir, 
    '**/*.js'
  )
  const clientMatches = glob.sync(clientPattern)

  const herkinPattern = path.join(
    TEST_UTILS_PATH,
    'steps/**/*.js',
  )
  const herkinMatches = glob.sync(herkinPattern)

  return uniqArr([
    ...clientMatches,
    ...herkinMatches,
  ])
}


/**
 * Gets all file paths for bdd support files
 * @return {Array<string>} file paths
 */
const getParkinSupport = () => {
  const parkinEnvironment = `${TEST_UTILS_PATH}/parkin/setupTestEnvironment.js`
  const herkinHooks = `${TEST_UTILS_PATH}/support/hooks`

  // Don't include the world here because it gets loaded in herkin/support/world.js
  const pattern = path.join(
    mountPoint, 
    config.paths.supportDir, 
    '**/+(hook.js|setup.js)'
  )
  const matches = glob.sync(pattern)

  // Add the default herkin hooks for setting up the tests
  matches.push(herkinHooks)

  // Add the parkin environment setup first
  // This ensures we can get access to the Parkin instance
  matches.unshift(parkinEnvironment)

  return matches
}

module.exports = {
  rootDir: HERKIN_ROOT,
  moduleFileExtensions: [
    'feature',
    'js',
    'json',
    'ts',
    'tsx'
  ],
  setupFilesAfterEnv: [
    ...getParkinSupport(),
    ...getStepDefinitions()
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // Add the custom parkin transformer for feature files
    '^.*\\.feature': `${TEST_UTILS_PATH}/parkin/transformer.js`
  },
  testMatch: [
    '<rootDir>/tests/bdd/**/*.feature'
  ],
  moduleNameMapper: jestAliases,
  reporters: [
    'default',
    [ 
      './node_modules/jest-html-reporter',
      { 
        pageTitle: 'Parkin Test Results' ,
        outputPath: `${HERKIN_REPORTS_DIR}/feature/report.html`
      }
    ]
  ],
}