const path = require('path')

module.exports = {
  paths: {
    rootDir: __dirname,
    testsRoot: path.join(__dirname, 'tests'),
    featuresDir: 'bdd/features',
    stepsDir: 'bdd/steps',
    unitDir: 'jest',
    wolfDir: 'wolf'
  }
}