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
} = require('../libs/fileSys')

const {
  buildFileTree,
  getRootPaths,
} = require('../libs/fileSys/fileTree')


/**
 * Creates new file based on file type within the docker mounted test root folder
 * @param {Object} app - Express application object
 * @param {object} config - Herkin server config
 * 
 * @returns {Object} - response object model containing the saved fileModel
 */
const createFile = (app, config) => async (req, res) => {
  try {
    const { name, type } = req.body
    const meta = await createTestFile(config, name, type)

    return apiResponse(req, res, meta, 200)
  }
  catch(err){
    console.log(err.stack)
    return apiErr(req, res, err, err.status || 400)
  }
}

/**
 * Saves a file to a location within the docker mounted test root folder
 * @param {Object} app - Express application object
 * @param {object} config - Herkin server config
 * 
 * @returns {Object} - response object model containing the saved fileModel
 */
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

/**
 * Loads a file from within the docker mounted test root folder
 * @param {Object} app - Express application object
 * @param {object} config - Herkin server config
 * 
 * @returns {Object} - response object model containing the loaded fileModel
 */
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

/**
 * Deletes an file located within the docker mounted test root folder
 * @param {Object} app - Express application object
 * @param {object} config - Herkin server config
 * 
 * @returns {Object} - response object model
 */
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
 * Iterates through the docker mounted volume of the test root folder
 * Returns a tree like structure of all the folders/files found within
 * @param {Object} app - Express application object
 * @param {object} config - Herkin server config
 * 
 * @returns {Object} - { rootPaths: array of root paths, nodes: array of all valid node object }
 */
const getTree = (app, config) => async (req, res) => {
  try {

    const {nodes, rootPaths} = await buildFileTree(config, req.params)

    return apiResponse(req, res, { 
      nodes,
      rootPaths
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