const { exec } = require('child_process')
const { isObj, exists } = require('@keg-hub/jsutils')

const platform = process.platform

/**
 * Helper method to kill the running process based on passed in pid
 * @function
 * @public
 *
 * @param {Object|string|number} - Pid of the process, or Object with the pid property
 *
 * @returns {boolean|*} - False if no pid is passed, or the response from the exec method
 */
const killProc = proc => {
  const procPid = isObj(proc) ? proc.pid : proc

  return exists(procPid) &&
    exec(
      platform === 'win32'
        ? `taskKill /pid ${procPid} /t`
        : `kill -9 ${procPid}`
    )
}

module.exports = {
  killProc
}