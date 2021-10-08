const { spawn } = require('child_process')
const { noOpObj } = require('@keg-hub/jsutils')

/**
 * Helper to get the passed in args of the current script
 */
const getArgs = () => {
  const args = [].concat(process.argv)
    .reduce((acc, arg) => {
      arg !== '-d' &&
        arg !== '--daemon' &&
        acc.push(arg)

      return acc
    }, [])

  // Remove `node` executable from args
  args.shift()
  // get the name of the script that started the original process
  const script = args.shift()

  return {args, script}
}

/**
 * Daemonizes the script and return the spawned child object
 * @function
 * @public
 * @param {string} script - Path to the script to daemonize
 * @param {Array} args - Arguments to pass to the script
 * @param {Object} opts - Options to pass to the child spawned process
 *
 * @returns {Object} - Child process object
 */
const spawnDaemon = (script, args, opt=noOpObj) => {
  const defstd = 'inherit'

  const {
    env=noOpObj,
    stdout=defstd,
    stderr=defstd,
    cwd=process.cwd()
  } = opt

  const spawnOpts = {
    cwd,
    // Detaches the spawed process from the parent
    detached: true,
    env: {...env, ...process.env},
    stdio: [defstd, stdout, stderr],
  }

  // spawn the child using the same node process as ours
  const child = spawn(
    process.execPath,
    [script].concat(args),
    spawnOpts
  )

  // Remove reference to the child so the parent process can exit
  child.unref()

  return child
}

/**
 * Turns the process into a daemon by recalling it's self, then disconnecting
 * **IMPORTANT** - exists the current process after spawning it's self as a child
 * @function
 * @public
 * @exist
 * @param {Object} opts - Options to pass to the child spawned process
 */
const daemonize = (opt=noOpObj) => {
  // we are a daemon, don't daemonize again
  if (process.env.__ALREADY_DAEMONIZED) return process.pid

  const { args, script } = getArgs()

  const env = {
    ...process.env,
    ...opt.env,
    // Helper ENV so the child process can identify it as being a daemon
    __ALREADY_DAEMONIZED: true,
  }

  // Restart the current script as a daemon
  spawnDaemon(script, args, opt)

  // exit the parent process, but the child will continue running
  return process.exit()
}

module.exports = {
  spawnDaemon,
  daemonize
}
