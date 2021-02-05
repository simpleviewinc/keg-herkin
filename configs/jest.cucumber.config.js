const { jestAliases } = require('./aliases.config')
const tapRoot = '/keg/tap'
const rootModules = `${tapRoot}/node_modules`
const bddUtils = `${tapRoot}/repos/testUtils/bdd`
const mountPoint = `${tapRoot}/tests`

module.exports = {
  'moduleFileExtensions': [
    'feature',
    'js',
    'json',
    'ts',
    'tsx'
  ],
  'setupFiles': [
    `${rootModules}/module-alias/register`
  ],
  'setupFilesAfterEnv': [
    `${rootModules}/cucumber-jest/dist/init.js`,
    `${bddUtils}/steps`,
    `${bddUtils}/support/world`,
    `${bddUtils}/support/hooks`,
    `${mountPoint}/bdd/steps`,
  ],
  'transform': {
    '^.+\\.(feature)$': 'cucumber-jest',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  'testMatch': [
    '/keg/tap/**/*.feature'
  ],
  'moduleNameMapper': jestAliases
}