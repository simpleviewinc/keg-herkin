const { AppRouter } = require('HerkinAppRouter')
const { apiErr, apiResponse } = require('./handler')
const { treeNodeModel } = require('HerkinModels')
const {
  isDirectory,
  createTestFile,
  deleteTestFile,
  getTestFile,
  saveTestFile,
} = require('../libs/fileSys')

const {
  buildFileTree,
  getRootPaths,
} = require('../libs/fileSys/fileTree')

/**
 * Creates new file based on file type within the docker mounted test root folder
 * 
 * @returns {Object} - response object model containing the saved fileModel
 */
const createFile = async (req, res) => {
  try {
    const { name, type } = req.body
    const meta = await createTestFile(req.app.locals.config, name, type)

    return apiResponse(req, res, meta, 200)
  }
  catch(err){
    console.log(err.stack)
    return apiErr(req, res, err, err.status || 400)
  }
}

/**
 * Saves a file to a location within the docker mounted test root folder
 * 
 * @returns {Object} - response object model containing the saved fileModel
 */
const saveFile = async (req, res) => {
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
    const meta = await saveTestFile(req.app.locals.config, location, content)
    return apiResponse(req, res, meta || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, err.status || 400)
  }
}

/**
 * Loads a file from within the docker mounted test root folder
 * 
 * @returns {Object} - response object model containing the loaded fileModel
 */
const loadFile = async (req, res) => {
  try {
    const filePath = req.query.path
    const meta = await getTestFile(req.app.locals.config, filePath)

    return apiResponse(req, res, meta || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, err.status || 400)
  }
}

/**
 * Deletes an file located within the docker mounted test root folder
 * 
 * @returns {Object} - response object model
 */
const deleteFile = async (req, res) => {
  try {
    const file = req.params.file
    const meta = await deleteTestFile(req.app.locals.config, file)

    return apiResponse(req, res, meta || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

/**
 * Iterates through the docker mounted volume of the test root folder
 * Returns a tree like structure of all the folders/files found within
 * 
 * @returns {Object} - { rootPaths: array of root paths, nodes: array of all valid node object }
 */
const getTree = async (req, res) => {
  try {

    const {nodes, rootPaths} = await buildFileTree(req.app.locals.config, req.params)

    return apiResponse(req, res, { 
      nodes,
      rootPaths
    } || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}
 
module.exports = () => {
  AppRouter.get('/files/tree', getTree)
  AppRouter.get('/files/load', loadFile)
  AppRouter.post('/files/save', saveFile)
  AppRouter.post('/files/create', createFile)
  AppRouter.delete('/files/delete', deleteFile)
}