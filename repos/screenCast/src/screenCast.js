const { killProc } = require('./killProc')
const { Logger } = require('@keg-hub/cli-utils')
const { startBrowser } = require('./startBrowser')
const { startSockify } = require('./startSockify')
const { startTigerVNC } = require('./startTigerVNC')
const { noOpObj, exists, isObj } = require('@keg-hub/jsutils')

let VNC_PROC
let SOCK_PROC
let PW_BROWSER

/**
 * Helper method to kill the running process
 * @function
 * @public
 *
 * @returns {Void}
 */
const killScreenCast = async () => {
  PW_BROWSER &&
    PW_BROWSER.browser &&
    await PW_BROWSER.browser.close()
  PW_BROWSER = null

  // Kill sockify and vnc process based on pid
  killProc(VNC_PROC)
  VNC_PROC = null
  killProc(SOCK_PROC)
  SOCK_PROC = null

  Logger.info(`[ ScreenCast ] Processes have been terminated!\n`)
}


/**
 * Kills and exists the running ScreenCast processes
 *
 * @param {number|string} - Exit status for the current node process
 *
 * @returns {Void}
 */
const killAndExit = (exitStatus, message, type=`log`) => {
  // Log a message before killing the processes
  message && Logger[type](message)

  return killScreenCast()
    .then(() => {
      return 0
    })
    .catch(err => {
      Logger.error(err.stack)
      return 1
    })
    .finally((status=0) => process.exit(exists(exitStatus) ? exitStatus : status))
}

/**
 * Listen for "(cmd|ctrl) + c" keyboard events, and exit the running process
 * Calling exit should automatically kill all child processes
 * Used when servers are not started in detached mode, must be explicity set
 *
 * @param {string|number} - Exit status of the process
 *
 * @returns {Void}
 */
const handleOnExit = (exitStatus) => {
  process.on("SIGINT", () => killAndExit(exitStatus))
}

/**
 * Starts the vnc and novnc servers running in the background. Then starts the browser
 * @function
 * @public
 *
 * @param {Object} args
 * @param {Object} args.vnc - Config used when starting the vnc server
 * @param {Object} args.sockify - Config used when starting the websockify novnc server
 * @param {Object} args.browser - Config used when starting the browser via playwright
 * @param {boolean} exitListener - Should the process be killed on SIGINT
 *
 * @returns {Object} - Contains the browser, context, page, and child process of the servers 
 */
const screenCast = async ({ vnc=noOpObj, sockify=noOpObj, browser }, exitListener) => {

  // Setup listener to kill process on exit
  exitListener && handleOnExit()

  Logger.info(`\n[ ScreenCast ] Starting servers...`)
  // Start the VNC server and the websockify server
  VNC_PROC = await startTigerVNC(vnc)
  SOCK_PROC = await startSockify(sockify)
  PW_BROWSER = isObj(browser) ? await startBrowser(browser, PW_BROWSER) : PW_BROWSER

  Logger.info(`\n[ ScreenCast ] Servers started successfully\n`)

  return {
    ...(PW_BROWSER || noOpObj),
    vncProc: VNC_PROC,
    sockProc: SOCK_PROC,
  }
}


require.main === module
  ? screenCast(noOpObj, true)
  : (module.exports = { screenCast, killScreenCast })