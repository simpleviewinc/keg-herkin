const componentsApi = require('./components')
const featuresApi = require('./features')
const rootApi = require('./root')
const stepsApi = require('./steps')
const bddApi = require('./bdd')

module.exports = (app, config) => {
  bddApi(app, config)
  featuresApi(app, config)
  stepsApi(app, config)
  componentsApi(app, config)
  rootApi(app, config)
}