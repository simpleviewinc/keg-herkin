const featuresApi = require('./features')
const rootApi = require('./root')
const definitionsApi = require('./definitions')
const bddApi = require('./bdd')
const filesApi = require('./files')
const reportsApi = require('./reports')


module.exports = (...args) => {
  bddApi(...args)
  featuresApi(...args)
  definitionsApi(...args)
  filesApi(...args)
  rootApi(...args)
  reportsApi(...args)
}