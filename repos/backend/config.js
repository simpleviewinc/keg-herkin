const path = require('path')
const { deepMerge } = require('@keg-hub/jsutils')
const rootDir = path.join(__dirname, '../../')
const { EDITOR_CONFIG_PATH } = process.env
let loadedConfig

const defConfig = {
  server: {
    port: '5005',
    host: '0.0.0.0'
  },
  editor: {
    stepsFolder: path.join(rootDir, 'tests/bdd/steps'),
    featuresFolder: path.join(rootDir, 'tests/bdd/features'),
    componentsFile: path.join(rootDir, 'tests/bdd/components.js'),
    testsFolder: path.join(rootDir, 'tests/tests')
  }
}


const loadConfig = () => {
  if(loadedConfig) return loadedConfig

  const configPath = path.join(rootDir, EDITOR_CONFIG_PATH || '../../configs/app.config')

  try { loadedConfig = require(configPath) }
  catch (e) { loadedConfig = {} }

  return loadedConfig
}

const getConfig = (config={}) => deepMerge(defConfig, loadConfig(), config)

module.exports = {
  getConfig
}
