const { AppRouter } = require('HerkinAppRouter')
const { apiErr, apiResponse } = require('./handler')
const { loadFeatures } = require('../libs/features')

const getFeatures = async (req, res) => {
  try {

    const features = await loadFeatures(req.app.locals.config)

    return apiResponse(req, res, features || [], 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }

}

module.exports = () => {
  AppRouter.get('/features', getFeatures)
}