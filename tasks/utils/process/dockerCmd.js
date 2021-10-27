const { runCmd } = require('./runCmd')
const { noOpObj } = require('@keg-hub/jsutils')
const { ensureArray, envToStr, inDocker } = require('../helpers')

/**
 * Runs a command inside the docker container
 * @param {String} containerName - name of container to run command within
 * @param {Array<string>} args - docker exec args
 * @param  {Array<string>} extra.opts - docker exec opts
 * @param  {Array<string>} extra.envs - docker exec envs
 * @example
 * dockerExec('keg-herkin', 'npx playwright install firefox')
 */
const dockerExec = (containerName, args, extra=noOpObj) => {
  const { opts=[], envs={} } = extra

  const allArgs = [
    'exec',
    '-it',
    ...envToStr(envs),
    containerName,
    ...ensureArray(args)
  ]

  return runCmd('docker', allArgs, opts)
}

const containerExec = (_, args, extra=noOpObj) => {
  const cmd = args.shift()
  const { opts=[], envs={} } = extra

  return runCmd(cmd, ensureArray(args), envs)
}

const dockerCmd = (...args) => inDocker() ? containerExec(...args) : dockerExec(...args)


module.exports = {
  dockerCmd,
  dockerExec,
  containerExec,
}