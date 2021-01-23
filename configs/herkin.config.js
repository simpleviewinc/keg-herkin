const path = require('path')
const tapConfig = require('../tap.js')
const appConfig = require('./app.config.js')
const pkgConfig = require('../package.json')
const { deepMerge, exists, get, isStr, isFunc, noOpObj } = require('@keg-hub/jsutils')

const { KEG_HERKIN_CONFIG_PATH } = process.env

/**
 * Loads a custom config from an ENV, or passed in option
 * @param {string} runtimeConfigPath - Path to the custom config file
 *
 * @return {Object} - Loaded custom config
 */
const loadCustomConfig = (runtimeConfigPath) => {

  const configPath = isStr(runtimeConfigPath)
    ? runtimeConfigPath
    : KEG_HERKIN_CONFIG_PATH

  try {
    const customConfig = configPath
      ? require(path.join(__dirname, `../`, configPath))
      : noOpObj

    return isFunc(customConfig)
      ? customConfig()
      : customConfig
  }
  catch(err){
    if(configPath) throw err

    return noOpObj
  }
}


/**
 * Gets the Herkin application config from a number of sources
 * @param {object} argsConfig - Config options passed at runtime
 *
 * @return {Object} - Loaded Herkin config
 */
const getHerkinConfig = (argsConfig=noOpObj) => {

  const { config:configPath, ...runtimeConfig } = argsConfig
  const customConfig = loadCustomConfig(configPath)

  return deepMerge(
    get(pkgConfig, ['keg']),
    get(appConfig, ['keg']),
    get(tapConfig, ['keg']),
    customConfig,
  )

}

module.exports = {
  getHerkinConfig
}