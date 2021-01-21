const fs = require('fs')
const path = require('path')

/**
 * TODO: this could be extracted to the keg-cli utils at some point
 * Recursively searches for the custom config file in the given directory
 * @param {string} directory 
 * @param {string} filename - name of the file to find
 * 
 * @returns {Array<string>} - array of absolute paths
 */
const getCustomConfigPaths = (directory, filename) => {
  let results = []
  const contents = fs.readdirSync(directory)
  
  contents.length && contents.forEach((content) => {

    const contentPath = path.join(directory, content)
    const stat = fs.statSync(contentPath)

    results = stat.isDirectory()
      ? results.concat(getCustomConfigPaths(contentPath, filename))
      : (content === filename)
        ? results.concat(contentPath)
        : results
  })

  return results
}

module.exports = {
  getCustomConfigPaths
}