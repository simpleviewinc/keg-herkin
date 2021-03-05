const { runCmd } = require('./runCmd')
const { ensureArray } = require('../helpers')

const yarn = (args, ...opts) => runCmd(`yarn`, ensureArray(args), ...opts)
const npx = (args, ...opts) => runCmd(`npx`, ensureArray(args), ...opts)


module.exports = {
  npx,
  yarn,
}