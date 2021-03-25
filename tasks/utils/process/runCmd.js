const { spawnCmd } = require('@keg-hub/spawn-cmd')
const { isArr } = require('@keg-hub/jsutils')
const { HERKIN_ROOT } = require('HerkinBackConstants')

const runCmd = (cmd, args, env={}) => {
  return spawnCmd(cmd, {
    args,
    options: { env: { ...process.env, ...env } },
    cwd: HERKIN_ROOT
  })
}


module.exports = {
  runCmd,
  spawnCmd
}