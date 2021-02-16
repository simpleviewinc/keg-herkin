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
    if (node.fullPath === parentPath) {
      node.children.push(newItem)
      return true
    } 
    else {
      // check children
      return node.children.length > 0 && parentNodeExists(node.children, parentPath, newItem)
    }
  })

  return Boolean(found)
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
    const node = {
      id: path,
      fullPath: path,
      children: [],
      isModified: false
    }

    const isDir = fs.lstatSync(path).isDirectory()
    node.type = isDir ? 'folder' : 'file'

    // get name after last '/' excluding '/'
    const lastIndex = path.lastIndexOf('/')
    node.name = path.substring(lastIndex + 1)

    // ignore hidden files
    if (node.type === 'file' && node.name.startsWith('.')) return nodes


    const parentPath = path.substring(0, lastIndex)

    // either add new node to node.children, or as a new top level node
    nodes.length > 0
      ? !parentNodeExists(nodes, parentPath, node) && nodes.push(node)
      : nodes.push(node)
    
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