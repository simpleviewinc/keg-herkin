const { apiErr, apiResponse } = require('./handler')
const {
  deleteTestFile,
  getTestFile,
  saveTestFile
} = require('../libs/fileSys/testFiles')


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
    const meta = await testFiles.deleteTestFile(config, file)

    return apiResponse(req, res, meta || {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

module.exports = (app, config) => {
  app.get('/files/load', loadFile(app, config))
  app.post('/files/save', saveFile(app, config))
  app.delete('/files/delete', deleteFile(app, config))

  return app
}