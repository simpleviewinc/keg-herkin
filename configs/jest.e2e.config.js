const { jestAliases } = require('./aliases.config')
const path = require('path')
const rootDir = path.join(__dirname, '../')

// It's recommend to use a separate Jest configuration jest.e2e.config.js for jest-playwright 
// to gain speed improvments and by that to only use Playwright in the end-to-end tests
module.exports = {
  preset: 'jest-playwright-preset',
  rootDir,
  testMatch: ['<rootDir>/tests/tests/**/*.js?(x)'],
  testPathIgnorePatterns: ['config.js'],
  moduleNameMapper: jestAliases,
  reporters: [
    'default',
    [ 
      './node_modules/jest-html-reporter', 
      { 
        pageTitle: 'E2E Test Results' ,
        outputPath: './reports/e2e/report.html'
      }
    ]
  ],
}