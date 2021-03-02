const { buildModel } = require('./buildModel')

/**
 * Models a file tree node
 * @typedef FileModel
 * @property {string} id - Unique identifier
 * @property {string} name - Name of the file on disk
 * @property {string} type - content type at the location (folder / file)
 * @property {string} parent - Path to the parent folder
 * @property {Array} children - Child tree nodes when type is a folder
 * @property {string} location - Absolute path of the file on dist
 * @property {boolean} modified - Is the content different from file on disk
 */
const Model = {
  id: '',
  name: '',
  type: '',
  children: [],
  location: '',
  modified: false,
}

const treeNodeModel = overrides => buildModel(overrides, Model)

module.exports = {
  treeNodeModel
}
