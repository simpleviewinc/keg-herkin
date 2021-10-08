const { AppRouter } = require('HerkinAppRouter')
const { get, noOpObj } = require('@keg-hub/jsutils')
const { apiErr, apiResponse } = require('../handler')
const {
  ensureBrowser,
  restartBrowser,
  startBrowser,
  stopBrowser
} = require('HerkinScreenCast')

/**
 * Starts a Playwright Browser using the passed in params as launch options
 * @param {Object} req.params
 * @param {string} params.type - The browser type to start [chromium|firefox]
 *
 */
const browserStart = async (req, res) => {
  try {
    const { params, app } = req
    const browserConf = get(app, 'locals.config.screencast.browser', noOpObj)
    const { browser, context, page } = await ensureBrowser({
      ...browserConf,
      ...params
    })

    const [ data, status ] = Boolean(browser && context && page)
      ? [{ message: `Browser started successfully`, status: 'running' }, 200]
      : [{ message: `Browser could not be started. Please check the server logs`, status: 'stoped' }, 500]

    return apiResponse(req, res, data, status)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

/**
 * Checks if a browser is already running
 *
 */
const browserRunning = async (req, res) => {
  try {
    const { params } = req
  
    return apiResponse(req, res, {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

/**
 * Restarts a Browser by killing it, and starting it
 *
 */
const browserRestart = async (req, res) => {
  try {
    const { params, app } = req
    const browserConf = get(app, 'locals.config.screencast.browser', noOpObj)
    const { browser, context, page } = await restartBrowser({
      ...browserConf,
      ...params
    })

    const [ data, status ] = Boolean(browser && context && page)
      ? [{ message: `Browser restarted successfully`, status: 'running' }, 200]
      : [{ message: `Browser could not be restarted. Please check the server logs`, status: 'stoped' }, 500]

    return apiResponse(req, res, {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}



/**
 * Stops a Browser if its running
 *
 */
const browserStop = async (req, res) => {
  try {
    const { params } = req
  
    return apiResponse(req, res, {}, 200)
  }
  catch(err){
    return apiErr(req, res, err, 400)
  }
}

module.exports = () => {
  AppRouter.get('/screencast/browser/running', browserRunning)
  AppRouter.get('/screencast/browser/start', browserStart)
  AppRouter.post('/screencast/browser/restart', browserRestart)
  AppRouter.post('/screencast/browser/stop', browserStop)
}