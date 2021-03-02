const { buildModel } = require('./buildModel')

/**
 * Model for all test types
 * @typedef TestsModel
 * @property {Array} features - Holds all feature file models
 * @property {Array} definitions - Holds all definition file models
 * @property {Array} jest - Holds all jest test file models
 * @property {Array} waypoint - Holds all waypoint test file models
 */
const Model = {
  features: [],
  definitions: [],
  jest: [],
  waypoint: []
}

const testsModel = overrides => buildModel(overrides, Model)

module.exports = {
  testsModel
}