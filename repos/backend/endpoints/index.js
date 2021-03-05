const featuresApi = require('./features')
const rootApi = require('./root')
const definitionsApi = require('./definitions')
const bddApi = require('./bdd')
const filesApi = require('./files')
const reportsApi = require('./reports')


module.exports = (app, config) => {
  bddApi(app, config)
  featuresApi(app, config)
  definitionsApi(app, config)
  filesApi(app, config)
  rootApi(app, config)
  reportsApi(app, config)
}