const { buildModel } = require('./buildModel')

/**
 * Models a file tree node
 * @typedef FileModel
 * @property {string} id - Unique identifier
 * @property {string} name - Name of the file on disk
 * @property {string} type - content type at the location (folder / file)
 * @property {Array} children - Child tree nodes when type is a folder
 * @property {string} location - Absolute path of the file on dist
 */
const Model = {
  id: '',
  name: '',
  type: '',
  testType: '',
  children: [],
  location: '',
}

const treeNodeModel = overrides => buildModel(overrides, Model)

module.exports = {
  treeNodeModel
}
