const path = require('path')
const { Logger } = require('@keg-hub/cli-utils')
const { findProc, killProc } = require('../proc')
const { flatUnion } = require('../utils/flatUnion')
const { create:childProc } = require('@keg-hub/spawn-cmd/src/childProcess')
const { noOpObj, noPropArr, limbo, checkCall, deepMerge } = require('@keg-hub/jsutils')

const rootDir = path.join(__dirname, '../../../../')
const { NO_VNC_PORT=26369, VNC_SERVER_PORT=26370 } = process.env

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
const startSockify = async ({ args=noPropArr, cwd, options=noOpObj, env=noOpObj }) => {
  if(SOCK_PROC) return SOCK_PROC

  const [_, status] = await limbo(findProc('websockify'))

  if(status.pid){
    Logger.pair(`- Websockify already running with pid:`, status.pid)
    return (SOCK_PROC = status)
  }

  Logger.log(`- Starting websockify server...`)
  SOCK_PROC = await childProc({
    cmd: 'websockify',
    args: flatUnion([
      '-v',
      '--web',
      '/usr/share/novnc',
      `0.0.0.0:${NO_VNC_PORT}`,
      `0.0.0.0:${VNC_SERVER_PORT}`
    ], args),
    options: deepMerge({
      detached: true,
      stdio: 'ignore',
      cwd: cwd || rootDir,
      env: { ...process.env }
    }, options, { env }),
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