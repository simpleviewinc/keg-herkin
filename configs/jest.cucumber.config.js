const { jestAliases } = require('./aliases.config')
const { getHerkinConfig } = require('./getHerkinConfig')
const tapRoot = '/keg/tap'
const rootModules = `${tapRoot}/node_modules`
const bddUtils = `${tapRoot}/repos/testUtils/bdd`
const mountPoint = `${tapRoot}/tests`
const path = require('path')
const glob = require('glob')

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
    bddUtils,
    'steps/**/*.js',
  )
  const herkinMatches = glob.sync(herkinPattern)

  return [
    ...clientMatches,
    ...herkinMatches,
  ]
}


/**
 * Gets all file paths for cucumber support files
 * @return {Array<string>} file paths
 */
const getCucumberSupport = () => {
  const herkinWorld = `${bddUtils}/support/world`
  const herkinHooks = `${bddUtils}/support/hooks`

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
  moduleFileExtensions: [
    'feature',
    'js',
    'json',
    'ts',
    'tsx'
  ],
  setupFilesAfterEnv: [
    `${rootModules}/cucumber-jest/dist/init.js`,
    ...getCucumberSupport(),
    ...getStepDefinitions()
  ],
  transform: {
    '^.+\\.(feature)$': 'cucumber-jest',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: [
    '/keg/tap/**/*.feature'
  ],
  moduleNameMapper: jestAliases
}