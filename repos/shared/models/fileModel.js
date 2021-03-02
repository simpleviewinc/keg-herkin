const { buildModel } = require('./buildModel')

/**
 * Models a file loaded into memory
 * @typedef FileModel
 * @property {string} Name - Name of the file on disk
 * @property {string} location - Absolute path of the file on dist
 * @property {string} relative - Relative path to the root of keg-herkin
 * @property {string} content - Text content of the file
 * @property {string} fileType - Type of test feature / jest / waypoint,
 * @property {string} mime - Mime file type relative to the file extension
 * @property {Object} [ast] - File parsed into an ast format. Different per file type
 * @property {number} lastModified - EPOCH time that the file was last modified 
 * @property {boolean} modified - Is the content different from file on disk
 * @property {string} uuid - Local id of the file created when the model is created
 */
const Model = {
  name: '',
  location: '',
  relative: '',
  content: '',
  fileType: 'file',
  mime: 'text/plain',
  ast: {},
  lastModified: 0,
  modified: false,
  uuid: '',
}

const fileModel = overrides => buildModel(overrides, Model)

module.exports = {
  fileModel
}