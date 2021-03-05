const { tryRequireSync } = require('@keg-hub/jsutils/src/node')
const path = require('path')

/**
 * Searches the client's support directory for a world export
 * @return {Object?} - the client's world object, or undefined if it does not exist
 */
const getClientWorld = () => {
  const clientSupportPath = path.join(
    process.env.HERKIN_TESTS_ROOT,
    process.env.HERKIN_SUPPORT_DIR,
  )

  const worldPaths = [
    clientSupportPath,
    path.join(clientSupportPath, 'world'),
  ]

  const clientExport = worldPaths.find(tryRequireSync)
  return clientExport && clientExport.world
}

module.exports = { getClientWorld }