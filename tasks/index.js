require('../configs/aliases.config').registerAliases()

/**
 * Set the taps root path within the cli-utils
 * Ensure child processes run from the cli-utils use the tap folder as the root directory
 * This generally only needed when task are called form the keg-cli and not yarn
 */
const { appRoot } = require('./paths')
const { setAppRoot } = require('@keg-hub/cli-utils')
setAppRoot(appRoot)

module.exports = require('./definitions')
