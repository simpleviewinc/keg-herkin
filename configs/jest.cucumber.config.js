const { jestAliases } = require('./aliases.config')
const { getHerkinConfig } = require('./getHerkinConfig')
const tapRoot = '/keg/tap'
const rootModules = `${tapRoot}/node_modules`
const bddUtils = `${tapRoot}/repos/testUtils/bdd`
const mountPoint = `${tapRoot}/tests`
const path = require('path')
const glob = require('glob')

const config = getHerkinConfig()

const getClientSteps = () => {
  const pattern = path.join(
    mountPoint, 
    config.paths.stepsDir, 
    '**/*.js'
  )
  return glob.sync(pattern)
}

const getClientSupport = () => {

}

module.exports = {
  moduleFileExtensions: [
    'feature',
    'js',
    'json',
    'ts',
    'tsx'
  ],
  setupFiles: [
    `${rootModules}/module-alias/register`
  ],
  setupFilesAfterEnv: [
    `${rootModules}/cucumber-jest/dist/init.js`,
    `${bddUtils}/steps`,
    `${bddUtils}/support/world`,
    `${bddUtils}/support/hooks`,
    ...getClientSteps()
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