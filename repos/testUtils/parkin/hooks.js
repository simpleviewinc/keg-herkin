const { parkin } = require('./instance')

module.exports = {
  BeforeAll: parkin.hooks.beforeAll.bind(parkin.hooks),
  AfterAll: parkin.hooks.beforeAll.bind(parkin.hooks),
}