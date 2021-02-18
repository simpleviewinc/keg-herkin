const { parkin } = require('./instance')

module.exports = {
  Given: parkin.Given.bind(parkin),
  When: parkin.When.bind(parkin),
  Then: parkin.Then.bind(parkin)
}