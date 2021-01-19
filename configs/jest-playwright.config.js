
const fs = require('fs')
const path = require('path')
const testsDir = path.join(__dirname, '../tests')
const scriptName = path.basename(__filename)
const { deepMerge } = require('@keg-hub/jsutils')

const defaultConfig = {
  serverOptions: {},
  launchOptions: {
    headless: true
  },
  contextOptions: {
    ignoreHTTPSErrors: true,
    viewport: {
      width: 1920,
      height: 1080
    }
  },
  browsers: ['chromium'],
}

/**
 * Recursively searches for the custom config file in the given directory
 * @param {string} directory 
 * 
 * @returns {Array<string>} - array of absolute paths
 */
const getCustomConfigPaths = (directory) => {
  let results = []
  const contents = fs.readdirSync(directory)
  
  contents.length && contents.forEach((content) => {

    const contentPath = path.join(directory, content)
    const stat = fs.statSync(contentPath)

    results = stat.isDirectory()
      ? results.concat(getCustomConfigPaths(contentPath))
      : (content === scriptName)
        ? results.concat(contentPath)
        : results
  })

  return results
}


/**
 * Merges the custom playwright config with our default one
 * @returns {Object}
 */
const getPlaywrightConfig = () => {
  const customConfigPath = getCustomConfigPaths(testsDir)[0]
  const customConfig = customConfigPath && require(customConfigPath)

  return deepMerge(
    defaultConfig,
    customConfig
  )
}

module.exports = getPlaywrightConfig()