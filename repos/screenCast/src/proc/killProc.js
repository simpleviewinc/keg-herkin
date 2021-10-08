const { exec } = require('child_process')
const { isObj, exists } = require('@keg-hub/jsutils')

/**
 * Helper method to kill the running process based on passed in pid
 * Kill sockify and vnc process based on pid
 * The processes are detached when started
 * So we have to call `kill -9 <pid>`
 * @function
 * @public
 *
 * @param {Object|string|number} proc - Pid of the process, or Object with the pid property
 * @param {string} platform - The OS type the command is being run on
 *
 * @returns {boolean|*} - False if no pid is passed, or the response from the exec method
 */
const killProc = (proc, platform=process.platform) => {
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