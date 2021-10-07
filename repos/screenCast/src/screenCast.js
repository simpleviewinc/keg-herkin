const { killProc } = require('./killProc')
const { startVNC, stopVNC } = require('./vnc')
const { Logger } = require('@keg-hub/cli-utils')
const { startSockify, stopSockify } = require('./sockify')
const { stopBrowser } = require('./browser')
const { noOpObj, exists, isObj } = require('@keg-hub/jsutils')

/**
 * Helper method to kill the running process
 * @function
 * @private
 *
 * @returns {Void}
 */
const killScreenCast = async () => {
  await stopBrowser()
  await stopSockify()
  await stopVNC()

  Logger.info(`[ ScreenCast ] Processes have been terminated!\n`)
}

/**
 * Kills and exists the running ScreenCast processes
 * @function
 * @private
 * @param {number|string} - Exit status for the current node process
 *
 * @returns {Void}
 */
const killAndExit = exitStatus => {
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
 * @function
 * @private
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
const screencast = async ({ vnc=noOpObj, sockify=noOpObj }, exitListener) => {

  // Setup listener to kill process on exit
  exitListener && handleOnExit()

  Logger.info(`\n[ ScreenCast ] Starting servers...`)
  // Start the VNC server and the websockify server
  const vncProc = await startVNC(vnc)
  const sockProc = await startSockify(sockify)

  Logger.info(`\n[ ScreenCast ] Servers started successfully\n`)

  return {
    sockProc,
    vncProc,
  }
}

/**
 * If the module is called directly, just call screencast
 * Otherwise export the screenCase and process methods
 */
require.main === module
  ? screencast(noOpObj, true)
  : (module.exports = {
      killScreenCast,
      screencast,
      startSockify,
      stopSockify,
      startVNC,
      stopVNC,
    })