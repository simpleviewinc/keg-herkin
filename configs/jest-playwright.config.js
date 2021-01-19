
const path = require('path')
const testsDir = path.join(__dirname, '../tests')
const { getCustomConfigPaths } = require('./getCustomConfigPaths')
const scriptName = process.env.HERKIN_PLAYWRIGHT_CONFIG || path.basename(__filename)
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
}


/**
 * Merges the custom playwright config with our default one
 * @returns {Object}
 */
const getPlaywrightConfig = () => {
  const customConfigPath = getCustomConfigPaths(testsDir, scriptName)[0]
  const customConfig = customConfigPath && require(customConfigPath)

  const config = deepMerge(
    defaultConfig,
    customConfig
  )
  
  // set default browser if none passed in
  if (!config.browsers) config.browsers = ['chromium']

  return config
}

module.exports = getPlaywrightConfig()