const path = require('path')
const { findProc } = require('./findProc')
const { Logger } = require('@keg-hub/cli-utils')
const { noOpObj, noPropArr, limbo } = require('@keg-hub/jsutils')
const { create:childProc } = require('@keg-hub/spawn-cmd/src/childProcess')

const rootDir = path.join(__dirname, '../../../')
const { VNC_SERVER_PORT=26370, DISPLAY=':0.0' } = process.env

/**
 * Cache holder for the tigervnc process
 * @type {Object|undefined}
 */
let VNC_PROC

/**
 * Starts tigervnc to allow loading VNC in the browser
 * @param {Object} args - options for setting up tigervnc
 * @param {Array} args.args - Arguments to pass to the Xtigervnc command
 * @param {Array} args.cwd - Location where the command should be run
 * @param {Array} args.env - Extra environment variables to pass
 *
 * @example
 * Xtigervnc -SecurityTypes None -geometry 1288x804x24 -rfbport 26370 -alwaysshared :0
 * Xtigervnc -SecurityTypes None -geometry 1288x804x24 -rfbauth /root/.vnc/passwd -rfbport 26370 -alwaysshared :0
 *
 * @returns {Object} - Child process running tigervnc
 */
const startVNC = async ({ args=noPropArr, cwd, options=noOpObj, env=noOpObj }) => {

  const [_, status] = await limbo(findProc('Xtigervnc'))

  if(status.pid){
    Logger.pair(`- Tigervnc already running with pid:`, status.pid)
    return (VNC_PROC = status)
  }

  Logger.log(`- Starting tigervnc server...`)
  VNC_PROC = await childProc({
    cmd: 'Xtigervnc',
    args: [
      '-SecurityTypes',
      'None',
      '-geometry',
      '1288x804x24',
      '-rfbport',
      VNC_SERVER_PORT,
      '-alwaysshared',
      DISPLAY,
      ...args,
    ],
    options: {
      detached: true,
      stdio: 'ignore',
      cwd: cwd || rootDir,
      ...options,
      env: { ...process.env, ...options.env, ...env }
    },
    log: true,
  })

  return VNC_PROC
}

/**
 * Stops the websockify server if it's running
 * If no reference exists, calls findProc to get a reference to the PID
 *
 * @return {Void}
 */
const stopVNC = async () => {
  VNC_PROC
    ? killProc(VNC_PROC)
    : checkCall(() => {
        const [_, status] = await limbo(findProc('Xtigervnc'))
        status &&
          status.pid &&
          killProc(status)
      })

  VNC_PROC = undefined
}

module.exports = {
  startVNC,
  stopVNC,
}