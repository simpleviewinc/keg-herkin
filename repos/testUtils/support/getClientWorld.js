const path = require('path')
const glob = require('glob')
const { HERKIN_TESTS_ROOT, HERKIN_SUPPORT_DIR } = require('../../../constants/backend')
const { tryRequireSync } = require('@keg-hub/jsutils/src/node')

/**
 * Searches the client's support directory for a world export
 *
 * @return {Object?} - the client's world object, or undefined if it does not exist
 */
const getClientWorld = () => {

  const worldPattern = path.join(
    HERKIN_TESTS_ROOT,
    HERKIN_SUPPORT_DIR,
    '**/world.js'
  )

  const clientExport = glob.sync(worldPattern)
    .reduce((found, file) => (found || tryRequireSync(file)), false)

  return clientExport && clientExport.world
}

module.exports = { getClientWorld }