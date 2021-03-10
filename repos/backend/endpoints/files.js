const fs = require('fs')
const path = require('path')
const { apiErr, apiResponse } = require('./handler')
const { treeNodeModel } = require('HerkinModels')
const {
  isDirectory,
  createTestFile,
  deleteTestFile,
  getTestFile,
  saveTestFile,
  getFolderContent
} = require('../libs/fileSys')

const createFile = (app, config) => async (req, res) => {
  try {

    const { name, type } = req.body
    const meta = await createTestFile(config, location, content)
    return apiResponse(req, res, meta || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, err.status || 400)
  }
}

const saveFile = (app, config) => async (req, res) => {
  try {
    const location = req.body.path
    if (!location)
      return apiErr(
        req,
        res,
        new Error(`[API - Files] Save failed: location required`), 
        400
      )

    const content = req.body.content
    const meta = await saveTestFile(config, location, content)
    return apiResponse(req, res, meta || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, err.status || 400)
  }
}

const loadFile = (app, config) => async (req, res) => {
  try {
    const filePath = req.query.path
    const meta = await getTestFile(config, filePath)

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
    return node.location === parentPath
      ? Boolean(node.children.push(newItem?.id)) && nodes.push(newItem)
      : node.children?.length && parentNodeExists(node.children, parentPath, newItem)
  })

  return Boolean(found)
}

/**
 * Gets the metadata of a path from the local filesystem
 * @param {string} filePath - full path to the folder or file i.e '/keg/tap/tests/bdd/features'
 * 
 * @returns {Object} - Meta data containing {name, parent, type ( folder || file )} properties
 */
const getPathMeta = async filePath => {
  const isDir = await isDirectory(filePath)

  return {
    id: filePath,
    location: filePath,
    name: path.basename(filePath),
    parent: path.dirname(filePath),
    type: isDir ? 'folder' : 'file',
  }
}

/**
 * Transforms the paths string to a specific data object
 * @param {Array<string>} paths - full paths to the folder or file i.e '/keg/tap/tests/bdd/features'
 * 
 * @returns {Array<Object>} - each object has the form: 
 *                            {id, location, children: [], modified}
 */
const getPathNodes = async paths => {
   /**
   * 1. create new object for each 'path' item
   * 2. if the parent path of current 'path' item exists, add it as the child
   */
  return await paths.reduce(async (toResolve, path) => {
    const nodes = await toResolve

    // Get the meta data for this path
    const { parent, ...pathMeta } = await getPathMeta(path)
    
    // Ignore hidden files that start with a .
    if (pathMeta.type === 'file' && pathMeta.name.startsWith('.')) return nodes
  
    const node = treeNodeModel({
      children: [],
      modified: false,
      ...pathMeta,
    })

    // either push the node or add it to an existing node.children
    ;(!nodes.length || !parentNodeExists(nodes, parent, node)) &&
      nodes.push(node)

    return nodes
  }, Promise.resolve([]))

}

/**
 * Returns an array of root paths
 * @param {Array<string>} fullPaths
 * @param {string} testsRootPath
 * 
 * @returns {Array<string>}
 */
const getRootPaths = (fullPaths, testsRootPath) => {
  return fullPaths.filter(fullPath => 
    path.dirname(fullPath) === testsRootPath
  )
}

/**
 * iterates through the mounted test root folder and returns a tree like structure of all the folders/files
 * @param {Object} app 
 * @param {object} config - shared config
 * 
 * @returns {Object} - { rootPaths: array of root paths, nodes: array of all valid node object }
 */
const getTree = (app, config) => async (req, res) => {
  try {
    const { testsRoot } = config.paths
    const meta = await getFolderContent(testsRoot, {
      full: true,
      recursive: true,
    })
    const nodes = await getPathNodes(meta)

    return apiResponse(req, res, { 
      rootPaths: getRootPaths(meta, testsRoot), 
      nodes 
    } || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}
 
module.exports = (app, config) => {
  app.get('/files/tree', getTree(app, config))

  app.get('/files/load', loadFile(app, config))
  app.post('/files/save', saveFile(app, config))
  app.post('/files/create', createFile(app, config))
  app.delete('/files/delete', deleteFile(app, config))

  return app
}