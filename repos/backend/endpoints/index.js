const componentsApi = require('./components')
const featuresApi = require('./features')
const rootApi = require('./root')
const definitionsApi = require('./definitions')
const bddApi = require('./bdd')

module.exports = (app, config) => {
  bddApi(app, config)
  featuresApi(app, config)
  definitionsApi(app, config)
  componentsApi(app, config)
  rootApi(app, config)
}