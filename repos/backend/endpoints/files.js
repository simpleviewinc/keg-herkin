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

const {
  getPathMeta,
  getPathNodes,
  getRootPaths,
  parentNodeExists
} = require('../libs/fileSys/fileTree')

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