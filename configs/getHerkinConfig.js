const fs = require('fs')
const path = require('path')
const tapConfig = require('../tap.js')
const defaultConfig = require('./herkin.default.config.js')
const pkgConfig = require('../package.json')
const { deepMerge, get, isStr, isFunc, noOpObj } = require('@keg-hub/jsutils')

const { KEG_HERKIN_CONFIG_PATH } = process.env

/**
 * Tries to require the path, returning null if unable to.
 * Does not throw.
 * @param {string} path 
 */
const tryRequire = path => {
  try {
    return fs.existsSync(path) 
      ? require(path)
      : null
  } catch (err) {
    return null
  }
}

/**
 * Tries to find the herkin.config.js(on) file at the execution directory.
 * @return {Object?} - the herkin config if the config exists at $(cwd)/herkin.config.js, else null
 */
const getCwdConfig = () => {
  const cwd = process.cwd()

  const execPaths = [
    path.join(cwd, 'herkin.config.js'),
    path.join(cwd, 'herkin.config.json')
  ]

  for (const path of execPaths) {
    const config = tryRequire(path)
    if (config) return config
  }

  return null
}

/**
 * Loads a custom config from an ENV, or passed in option
 * @param {string} runtimeConfigPath - Path to the custom config file
 *
 * @return {Object} - Loaded custom config, or null if not found
 */
const loadCustomConfig = (runtimeConfigPath) => {
  const configPath = isStr(runtimeConfigPath)
    ? runtimeConfigPath
    : KEG_HERKIN_CONFIG_PATH 

  try {
    const customConfig = configPath
      ? require(path.join(__dirname, `../`, configPath))
      : getCwdConfig()

    return isFunc(customConfig)
      ? customConfig()
      : customConfig
  }
  catch(err){
    if (configPath) throw err

    // if config is not specified by param or env, 
    // try finding it at the execution directory
    return getCwdConfig()
  }
}

/**
 * Gets the Herkin application config from a number of sources
 * @param {object} argsConfig - Config options passed at runtime
 *
 * @return {Object} - Loaded Herkin config
 */
const getHerkinConfig = (argsConfig=noOpObj) => {
  const customConfig = loadCustomConfig(argsConfig.config) || noOpObj

  return deepMerge(
    get(pkgConfig, ['keg']),
    get(tapConfig, ['keg']),
    defaultConfig,
    customConfig,
  )
}

module.exports = {
  getHerkinConfig
}