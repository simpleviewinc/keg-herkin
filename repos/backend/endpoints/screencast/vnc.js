const { AppRouter } = require('HerkinAppRouter')
const { apiErr, apiResponse } = require('../handler')
const {
  killScreenCast,
  screencast,
  startSockify,
  stopSockify,
  startVNC,
  stopVNC,
} = require('HerkinScreenCast')

const vncStatus = () => {
  try {
    const { params } = req
  
    return apiResponse(req, res, {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

const vncRestart = () => {
  try {
    const { params } = req
  
    return apiResponse(req, res, {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

module.exports = (...args) => {
  AppRouter.get('/screencast/vnc/status', vncStatus)
  AppRouter.post('/screencast/vnc/restart', vncRestart)
}