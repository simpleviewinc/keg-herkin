const { deepMerge, pickKeys } = require('@keg-hub/jsutils')

const buildModel = (overrides, Model) => deepMerge(
  Model,
  pickKeys(overrides, Object.keys(Model))
)

module.exports = {
  buildModel
}