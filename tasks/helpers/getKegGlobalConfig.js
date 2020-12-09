const path = require('path')
const homeDir = require('os').homedir()
const { KEG_GLOBAL_CONFIG } = process.env

// The default global config path and config file
let GLOBAL_CONFIG_FOLDER = path.join(homeDir, '.kegConfig')
let GLOBAL_CONFIG_FILE = 'cli.config.json'

// If the global config path is passed in as an ENV, use that instead
if(KEG_GLOBAL_CONFIG){
  const configPathSplit = KEG_GLOBAL_CONFIG.split('/')
  GLOBAL_CONFIG_FILE = configPathSplit.pop()
  GLOBAL_CONFIG_FOLDER = configPathSplit.join('/')
}

/**
 * Attempts to load the Keg-CLI global config from the user home directory
 * @param {boolean} [throwError=true] - Should the method throw if the config can not be loaded
 *
 * @return {Object} - Loaded Keg-CLI global config
 */
const getKegGlobalConfig = (throwError=true) => {
  const configPath = path.join(GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_FILE)
  try {
    return require(configPath)
  }
  catch(err){
    if(throwError) throw new Error(`Keg CLI global config could not be loaded from path: ${configPath}!`)

    return {}
  }
}

module.exports = {
  getKegGlobalConfig
}