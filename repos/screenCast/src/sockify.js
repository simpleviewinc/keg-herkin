const path = require('path')
const { findProc } = require('./findProc')
const { killProc } = require('./killProc')
const { Logger } = require('@keg-hub/cli-utils')
const { noOpObj, isArr, limbo, checkCall } = require('@keg-hub/jsutils')
const { create:childProc } = require('@keg-hub/spawn-cmd/src/childProcess')

const rootDir = path.join(__dirname, '../../../')
const { NO_VNC_PORT=26369 } = process.env

/**
 * Cache holder for the websockify process
 * @type {Object|undefined}
 */
let SOCK_PROC

/**
 * Starts websockify to allow loading VNC in the browser
 * @function
 * @public
 * @param {Object} args - options for setting up websockify
 * @param {Array} args.args - Arguments to pass to the websockify command
 * @param {Array} args.cwd - Location where the command should be run
 * @param {Array} args.env - Extra environment variables to pass
 *
 * @example
 * websockify -v --web /usr/share/novnc 0.0.0.0:26369 0.0.0.0:26370
 * @returns {Object} - Child process running websockify
 */
const startSockify = async ({ args, cwd, options=noOpObj, env=noOpObj }) => {
  if(SOCK_PROC) return SOCK_PROC

  const [_, status] = await limbo(findProc('websockify'))

  if(status.pid){
    Logger.pair(`- Websockify already running with pid:`, status.pid)
    return (SOCK_PROC = status)
  }

  Logger.log(`- Starting websockify server...`)
  SOCK_PROC = await childProc({
    cmd: 'websockify',
    args: (isArr(args) ? args : [
      '-v',
      '--web',
      '/usr/share/novnc',
      `0.0.0.0:${NO_VNC_PORT}`,
      `0.0.0.0:${VNC_SERVER_PORT}`
    ]),
    options: {
      detached: true,
      stdio: 'ignore',
      cwd: cwd || rootDir,
      ...options,
      env: { ...process.env, ...options.env, ...env }
    },
    log: true,
  })

  return SOCK_PROC
}

/**
 * Stops the websockify server if it's running
 * If no reference exists, calls findProc to get a reference to the PID
 * @function
 * @public
 *
 * @return {Void}
 */
const stopSockify = async () => {
  SOCK_PROC
    ? killProc(SOCK_PROC)
    : checkCall(async () => {
        const [_, status] = await limbo(findProc('websockify'))
        status &&
          status.pid &&
          killProc(status)
      })

  SOCK_PROC = undefined
}

module.exports = {
  startSockify,
  stopSockify
}