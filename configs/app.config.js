const path = require('path')
const rootDir = path.join(__dirname, '../')

module.exports = {
  paths: {
    rootDir,
    stepsFolder: path.join(rootDir, 'tests/bdd/steps'),
    featuresFolder: path.join(rootDir, 'tests/bdd/features'),
    componentsFile: path.join(rootDir, 'tests/bdd/components.js'),
    testsFolder: path.join(rootDir, 'tests/tests'),
    testsRoot: path.join(rootDir, 'tests')
  },
  server: {
    port: '5005',
    host: '0.0.0.0'
  },
  keg: {
  }
}
