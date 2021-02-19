const { parkin } = require('./instance')

const getStepHandler = (parkin, name) =>
  parkin[name].bind(parkin)

module.exports = {
  Given: getStepHandler(parkin, 'Given'),
  When: getStepHandler(parkin, 'When'),
  Then: getStepHandler(parkin, 'Then'),
  And: getStepHandler(parkin, 'And'),
  But: getStepHandler(parkin, 'But'),
}