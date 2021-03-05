const { buildModel } = require('./buildModel')
const { noOp } = require('@keg-hub/jsutils')
/**
 * Models a UI screen
 * @typedef ScreenModel
 * @property {string} id - Unique reference for the screen
 * @property {string} title - Display name of the screen
 * @property {string} activeFile - Current fileModel loaded into the screen
 * @property {boolean} isActive - Is the screen active in the UI
 * @property {Object|function} view - Render Component for the screen
 */
const Model = {
  id: '',
  title: '',
  View: noOp,
  activeFile: {},
  active: false,
}

const screenModel = overrides => buildModel(overrides, Model)

module.exports = {
  screenModel
}