const { buildModel } = require('./buildModel')

/**
 * Models a UI screen
 * @typedef ScreenModel
 * @property {string} file - Uuid of the active file of the screen
 * @property {boolean} isActive - Is the screen active in the UI
 * @property {name} name - Name of the screen
 */
const Model = {
  file: '',
  isActive: false,
  name: '',
}

const testsModel = overrides => buildModel(overrides, Model)

module.exports = {
  testsModel
}