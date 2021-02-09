const path = require('path')
const fullPath = relative => path.join(__dirname, relative)

module.exports = {
  paths: {
    testsRoot: fullPath('tests'),
    featuresDir: fullPath('tests/bdd/features'),
    stepsDir: fullPath('tests/bdd/steps'),
    unitDir: fullPath('tests/jest'),
    wolfDir: fullPath('tests/wolf')
  }
}