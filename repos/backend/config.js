const path = require('path')
const { deepMerge, noOpObj } = require('@keg-hub/jsutils')
const defaultConfig = require('../../configs/herkin.default.config')
const rootDir = path.join(__dirname, '../../')
const { EDITOR_CONFIG_PATH } = process.env

let loadedConfig

const mergeConfigs = (argConfig, customConfig) => {
  loadedConfig = deepMerge(defaultConfig, customConfig, argConfig)

  return loadedConfig
}

const initConfig = (argConfig) => {
  if(loadedConfig) return loadedConfig
  
  let customConfig
  try { customConfig = require(path.join(rootDir, EDITOR_CONFIG_PATH)) }
  catch (e) {}

  return mergeConfigs(argConfig, customConfig)
}

const getConfig = (config=noOpObj) => initConfig(config)

module.exports = {
  getConfig
}
