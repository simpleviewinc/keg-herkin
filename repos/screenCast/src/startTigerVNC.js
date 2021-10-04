const path = require('path')
const { findProc } = require('./findProc')
const { Logger } = require('@keg-hub/cli-utils')
const { noOpObj, noPropArr, limbo } = require('@keg-hub/jsutils')
const { create:childProc } = require('@keg-hub/spawn-cmd/src/childProcess')

const rootDir = path.join(__dirname, '../../../')
const { VNC_SERVER_PORT=26370, DISPLAY=':0.0' } = process.env

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
const startTigerVNC = async ({ args=noPropArr, cwd, options=noOpObj, env=noOpObj }) => {

  let childProc
  const [_, status] = await limbo(findProc('Xtigervnc'))

  if(status.pid){
    Logger.pair(`- Tigervnc already running with pid:`, status.pid)
    return (childProc = status)
  }

  Logger.log(`- Starting tigervnc server...`)
  childProc = await childProc({
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

  return childProc
}


module.exports = {
  startTigerVNC
}