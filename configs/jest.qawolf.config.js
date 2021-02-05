require('module-alias/register')

module.exports = {
  preset: 'jest-playwright-preset',
  transform: {},
  testMatch: [
    '<rootDir>/**/*.steps.js'
  ]
}