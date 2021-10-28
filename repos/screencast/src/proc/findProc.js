const { exec } = require('child_process')

/**
 * Parses the output of the search command
 * Assumes only a single running process could be found
 * @function
 * @private
 * @param {string} procName - The executable name to check
 * @param {string} output - Output of the process search command
 *
 * @returns {Object} - Status of the found process
 */
const parseOutput = (procName, output) => {
  const running = output.toLowerCase().includes(procName.toLowerCase())
  if(!running) return { running, name: procName }

  const [pid, tty, time, name] = output.trim().split(' ').filter(part => part)
  return {
    tty,
    time,
    running,
    name: name.replace('\n', ''),
    pid: parseInt(pid, 10),
  }
}

/**
 * Gets the command used to search for the process based on the platform
 * @function
 * @private
 * @param {string} procName The executable name to check
 * @param {string} platform - Name of the platform running the command
 *
 * @returns {string} - Search command to use
 */
const getPlatformCmd = (procName, platform) => {
  const proc = `"[${procName[0]}]${procName.substring(1)}"`
  switch (platform) {
    case 'linux':
    case 'darwin': return `ps -A | grep ${proc}`
    case 'win32': return `tasklist`
    default: return false
  }
}

/**
 * Searches for a currently process by name, and returns it if found
 * @function
 * @public
 * @param {string} procName The executable name to check
 *
 * @returns {Object} - Status of the found process
 */
const findProc = procName => {
  return new Promise((res, rej) => {
    const platform = process.platform
    // Use the platform to know the correct search command
    const cmd = getPlatformCmd(procName, platform)
    if(!cmd) return rej(`Error: ${platform} platform not supported.`)

    // Run the search command, and compare the output
    exec(cmd, (err, stdout, stderr) => {
      if(err || stderr) return res({ running: false, name: procName })

      // Finding the pid on windows machine not currently supported
      // I would need a windows OS to see the tasklist cmd output, to know how to parse it
      const status = platform === 'win32'
        ? { running: stdout.toLowerCase().includes(procName.toLowerCase()), name: procName }
        : parseOutput(procName, stdout)

      res(status)
    })
  })
}

module.exports = {
  findProc
}