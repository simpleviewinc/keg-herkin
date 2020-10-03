const componentsApi = require('./components')
const featuresApi = require('./features')
const rootApi = require('./root')
const stepsApi = require('./steps')
const testDataApi = require('./testData')

module.exports = (app, config) => {
  testDataApi(app, config)
  featuresApi(app, config)
  stepsApi(app, config)
  componentsApi(app, config)
  rootApi(app, config)
}