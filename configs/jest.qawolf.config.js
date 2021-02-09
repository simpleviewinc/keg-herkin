const { jestAliases } = require('./aliases.config')

module.exports = {
  // preset: 'jest-playwright-preset',
  // transform: {},
  moduleNameMapper: jestAliases
}