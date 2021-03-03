const fs = require('fs')
const path = require('path')
const defaultConfig = require('./herkin.default.config.js')
const pkgConfig = require('../package.json')
const { deepMerge, get, isStr, isFunc, noOpObj } = require('@keg-hub/jsutils')

const { KEG_HERKIN_CONFIG_PATH } = process.env

/**
 * TODO: replace with jsutils' tryRequireSync once its PR is merged in
 * Tries to require the path, returning null if unable to.
 * Does not throw.
 * @param {string} path 
 */
const tryRequireSync = path => {
  try {
    return fs.existsSync(path) 
      ? require(path)
      : null
  } catch (err) {
    return null
  }
}

/**
 * Tries to find the herkin.config.js(on) file at `cwd`
 * @param {string} pathToCheck - directory path to check
 * @return {Object?} - the herkin config if the config exists at $(cwd)/herkin.config.js, else null
 */
const getConfigAtPath = pathToCheck => {
  const validNames = [
    'herkin.config.js',
    'herkin.config.json'
  ]

  const paths = validNames.map(name => path.join(pathToCheck, name))

  for (const path of paths) {
    const config = tryRequireSync(path)
    if (config) return config
  }

  return null
}

/**
 * Searches the file system, from the current working directory
 * upwards to the root directory, for the herkin config
 * @return {Object?} - the herkin config if the config is found, else null
 */
const findConfig = () => {
  let currentPath = process.cwd()
  while (currentPath != '/') {
    const configAtPath = getConfigAtPath(currentPath)
    if (configAtPath) return configAtPath
    currentPath = path.join(currentPath, '../')
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
      : findConfig()

    return isFunc(customConfig)
      ? customConfig()
      : customConfig
  }
  catch(err){
    if (configPath) throw err

    // if config is not specified by param or env, 
    // try finding it at the execution directory
    return findConfig()
  }
}

/**
 * Gets the Herkin application config from a number of sources
 * @param {object} argsConfig - Config options passed at runtime
 * @return {Object} - Loaded Herkin config
 */
const getHerkinConfig = (argsConfig=noOpObj) => {

  const customConfig = loadCustomConfig(argsConfig.config)

  if (!customConfig && argsConfig.warn)
    console.warn(
      '\x1b[33m%s\x1b[0m',
      `Can\'t find a herkin config file, defaulting to "HerkinConfigs/herkin.default.config.js".\nTo use your own config, either:
       * specify a path with "--config <path>"; or 
       * ensure a config exists in your current working directory or above it`
    )

  return deepMerge(
    get(pkgConfig, ['herkin']),
    defaultConfig,
    customConfig
  )
}

module.exports = {
  getHerkinConfig,
}