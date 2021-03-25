const path = require('path')
const { singular } = require('@keg-hub/jsutils')

/**
 * Loops over the dir paths from the config looking for a matching path with the filePath
 * If found uses that to build the test file type
 * @param {string} filePath - Path to a test file
 * @param {Object} config - Herkin config object
 * 
 * @returns {string|boolean} - Found test file type or false
 */
const resolveTestFileType = (filePath, config) => {
  const { rootDir, testsRoot, ...testFilePaths } = config.paths

  return Object.entries(testFilePaths)
    .reduce((found, [ dirType, location ]) => {
      const fullDirPath = path.join(testsRoot, location)

      return found || !filePath.startsWith(fullDirPath)
        ? found
        : singular(dirType.replace('Dir', ''))
      return found
    }, false)
}
module.exports = {
  resolveTestFileType
}