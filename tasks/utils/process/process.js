const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { isArr } = require('@keg-hub/jsutils')
const { TAP_ROOT } = require('@globalConstants')

const ensureArray = data => isArr(data) ? data : data.split(' ')

const runCmd = (cmd, args, env={}) => {
  return spawnCmd(cmd, {
    args,
    options: { env: { ...process.env, ...env } },
    cwd: TAP_ROOT
  })
}

const yarn = (args, ...opts) => runCmd(`yarn`, ensureArray(args), ...opts)
const npx = (args, ...opts) => runCmd(`npx`, ensureArray(args), ...opts)

/**
 * 
 * @param {String} containerName - name of container to run command within
 * @param {Array<string>} args - docker exec args
 * @param  {Array<string>} extra.opts - docker exec opts
 * @param  {Array<string>} extra.envs - docker exec envs
 * @example
 * dockerExec('keg-herkin', 'npx qawolf create localhost:3000 foo')
 */
const dockerExec = (containerName, args, extra={}) => {
  const { 
    opts=[], 
    envs={} 
  } = extra

  const envStrs = Object
    .keys(envs)
    .map(key => `--env ${key}=${envs[key]}`)

  const allArgs = [ 
    'exec', 
    '-it', 
    ...envStrs, 
    containerName, 
    ...ensureArray(args) 
  ]

  return runCmd('docker', allArgs, opts)
}

module.exports = {
  npx,
  runCmd,
  yarn,
  spawnCmd,
  dockerExec
}