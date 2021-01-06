// TODO: Move logger into keg-cli-utils repo

const { Logger }  = require('@keg-hub/ask-it/src/logger')

/**
 * Helper to print an error on task failed
 *
 * @param {Error|Object} err - Error that was thrown
 *
 * @returns {void}
 */
const throwExitError = err => {
  Logger.header(`Task Error:`)
  Logger.error(`  ${err.stack}`)
  Logger.empty()

  process.exit(1)
}

module.exports = {
  throwExitError
}
