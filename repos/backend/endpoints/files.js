const { apiErr, apiResponse } = require('./handler')
const {
  deleteTestFile,
  getTestFile,
  saveTestFile,
  getFolderContentSync
} = require('../libs/fileSys')
const fs = require('fs')


const saveFile = (app, config) => async (req, res) => {
  try {
    const file = req.params.file
    const content = req.params.content
    const meta = await saveTestFile(config, file)

    return apiResponse(req, res, meta || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, err.status || 400)
  }
}

const loadFile = (app, config) => async (req, res) => {
  try {
    const file = req.query.file
    const meta = await getTestFile(config, file)
    
    return apiResponse(req, res, meta || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, err.status || 400)
  }
}

const deleteFile = (app, config) => async (req, res) => {
  try {
    const file = req.params.file
    const meta = await deleteTestFile(config, file)

    return apiResponse(req, res, meta || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

/**
 * Recursively checks to find the parent node for a given item
 * if a parent exists, it will add it as a child
 * @param {Array<Object>} nodes 
 * @param {string} parentPath 
 * @param {Object} newItem
 * 
 * @returns {Boolean} - whether a parent node exists and push was successful
 */
const parentNodeExists = (nodes, parentPath, newItem) => {
  const found = nodes.find((node) => {
    return node.fullPath === parentPath
      ? Boolean(node.children.push(newItem))
      : node.children.length && parentNodeExists(node.children, parentPath, newItem)
  })

  return Boolean(found)
}

/**
 * Gets the metadata of a path from the local filesystem
 * @param {string} path - full path to the folder or file i.e '/keg/tap/tests/bdd/features'
 * 
 * @returns {Object} - Meta data containing {name, parent, type ( folder || file )} properties
 */
const getPathMeta = path => {
  const pathSplit = path.split('/')
  return {
    name: pathSplit.pop(),
    parent: pathSplit.join('/'),
    type: fs.lstatSync(path).isDirectory() ? 'folder' : 'file',
  }
}

/**
 * Transforms the paths string to a specific data object
 * @param {Array<string>} paths - full paths to the folder or file i.e '/keg/tap/tests/bdd/features'
 * 
 * @returns {Array<Object>} - each object has the form: 
 *                            {id, fullPath, children: [], isModified}
 */
const generateTree = (paths) => {
   /**
   * 1. create new object for each 'path' item
   * 2. if the parent path of current 'path' item exists, add it as the child
   */
  return paths.reduce((nodes, path) => {
    // Get the meta data for this path
    const { parent, ...pathMeta } = getPathMeta(path)
    
    // Ignore hidden files that start with a .
    if (pathMeta.type === 'file' && pathMeta.name.startsWith('.')) return nodes
  
    const node = {
      id: path,
      children: [],
      fullPath: path,
      isModified: false,
      ...pathMeta,
    }

    // either push the node or add it to an existing node.children
    ;(!nodes.length || !parentNodeExists(nodes, parent, node)) &&
      nodes.push(node)

    return nodes
  }, [])

}

/**
 * iterates through the mounted test root folder and returns a tree like structure of all the folders/files
 * @param {Object} app 
 * @param {object} config - shared config
 */
const getTree = (app, config) => async (req, res) => {
  try {
    const { testsRoot } = config.paths
    const meta = await getFolderContentSync(testsRoot, {
      full: true,
      recursive: true,
    })
    const dataTree = generateTree(meta)
    return apiResponse(req, res, dataTree || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}
 
module.exports = (app, config) => {
  app.get('/files/get_tree', getTree(app, config))
  app.get('/files/load', loadFile(app, config))
  app.post('/files/save', saveFile(app, config))
  app.delete('/files/delete', deleteFile(app, config))

  return app
}