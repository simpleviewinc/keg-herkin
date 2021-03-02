const { jestAliases } = require('./aliases.config')
const { getHerkinConfig } = require('./getHerkinConfig')
const { TEST_UTILS_PATH, HERKIN_ROOT } = require('../constants/backend')
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
 * Gets all file paths for cucumber support files
 * @return {Array<string>} file paths
 */
const getCucumberSupport = () => {
  const herkinWorld = `${TEST_UTILS_PATH}/support/world`
  const herkinHooks = `${TEST_UTILS_PATH}/support/hooks`

  const pattern = path.join(
    mountPoint, 
    config.paths.supportDir, 
    '**/+(world.js|hook.js|setup.js)'
  )

  const matches = glob.sync(pattern)

  // only include the HerkinWorld if the user did not override it
  if (!matches.find(match => match.includes('world.js')))
    matches.push(herkinWorld)

  matches.push(herkinHooks)

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
    ...getCucumberSupport(),
    ...getStepDefinitions()
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/scripts/*.js'
  ],
  moduleNameMapper: jestAliases
}