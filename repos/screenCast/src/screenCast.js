require('../../../configs/aliases.config').registerAliases()
const { killProc } = require('./proc')
const { daemonize } = require('./utils/daemonize')
const { Logger } = require('@keg-hub/cli-utils')
const { noOpObj, exists, isObj } = require('@keg-hub/jsutils')
const { killAll } = require('@keg-hub/spawn-cmd/src/childProcess')
const {
  stopBrowser,
  startServer,
  stopServer
} = require('./playwright')
const {
  startSockify,
  stopSockify,
  startVNC,
  stopVNC,
} = require('./vnc')

/**
 * Helper method to kill the running process
 * @function
 * @private
 *
 * @returns {Void}
 */
const killScreenCast = async () => {
  await stopBrowser()
  await stopServer()
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
  Array.from([
    'SIGBREAK',
    'SIGINT',
    'SIGUSR1',
    'SIGUSR2',
    'uncaughtException',
    'SIGTERM'
  ])
  .map(type => process.on(type, exitCode => killScreenCast(exitCode || exitStatus || 0)))
}

/**
 * Check if we should daemonize the process
 * Look for -d || --daemon in the args passed to the script
 */
const checkIfDaemon = () => {
  const args = process.argv.slice(2)
  const asDaemon = Boolean(args.find(arg => (arg === '-d' || arg === '--daemon')))

  return asDaemon && daemonize()
}

/**
 * Check if we should kill the running processes
 * Look for -k || --kill in the args passed to the script
 */
const checkKill = async () => {
  const args = process.argv.slice(2)
  const shouldKill = Boolean(args.find(arg => (arg === '--kill-all-screencast')))
  shouldKill && await killAndExit()
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
const screencast = async ({ vnc=noOpObj, sockify=noOpObj, browser=noOpObj }, exitListener, skipDaemon) => {
  // Check if we should kill the screencast child processes
  await checkKill()

  // Check if we should daemonize the process
  ;(!exists(skipDaemon) || !skipDaemon) && checkIfDaemon()

  // Setup listener to kill process on exit
  ;exitListener && handleOnExit()

  Logger.info(`\n[ ScreenCast ] Starting servers...`)
  // Start the VNC, websockify, playwright servers
  const vncProc = await startVNC(vnc)
  const sockProc = await startSockify(sockify)
  const pwServer = await startServer(browser)
  Logger.info(`[ ScreenCast ] Servers started successfully\n`)

  return {
    pwServer,
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
      stopServer,
      startServer,
      startSockify,
      stopSockify,
      startVNC,
      stopVNC,
    })