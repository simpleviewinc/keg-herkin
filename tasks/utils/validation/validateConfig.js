const { isObj, noOp } = require('@keg-hub/jsutils')
const defaultConfig = require('HerkinConfigs/herkin.default.config.js')
const fs = require('fs')
const path = require('path')

/**
 * Error type specific to herkin config validation.
 * Just prefixes each message with a herkin label
 */
class HerkinConfigError extends Error {
  name = 'HerkinConfigError'

  constructor(message) {
    super(message)
  }
}

/**
 * Throws a missing file error
 * @param {string} key 
 * @param {string} path 
 * @param {string?} relativeTo - if defined, a path to the expected parent directory,
 * if null - the function will consider `path` an absolute path
 */
const missingFileError = (key, loc, relativeTo=null) => { 
  const pathType = relativeTo ? "Relative" : "Absolute"
  const relativeMessage = relativeTo ? `relative to:` : ''
  throw new HerkinConfigError(
    `${pathType} path "${key}"
      at "${loc}" 
      does not exist ${relativeMessage}
      ${relativeTo || ''}
    `
  )
}


/**
 * TODO: Update chechFilePaths to follow these rules
 * If a folder path is not defined, then use the default path
 * If a folder path is not defined, and a folder already exists at the default path, use that folder
 * If a folder does not exist at the default path, then create and use it
 * If a folder path is defined, and does not exist, then create it at that path, and use it
 */
/**
 * Checks that the paths in herkinConfig.paths are valid
 * @param {Object} paths - paths object
 * @param {Array<string>} expectedPaths - expected keys
 */
const checkFilePaths = (paths, expectedPaths) => {
  const { rootDir, testsRoot, ...relativePaths } = paths

  if (!fs.existsSync(rootDir)) 
    missingFileError('config.paths.rootDir', rootDir)

  if (!fs.existsSync(testsRoot))
    missingFileError('config.paths.testsRoot', testsRoot)

  Object
    .entries(relativePaths)
    .map(([key, testPath]) => {
      const fullPath = path.join(testsRoot, testPath)

      if(!fs.existsSync(fullPath)) fs.mkdir(fullPath, noOp)

      if (!expectedPaths.includes(key))
        throw new HerkinConfigError(
          `Keys in ".paths" must be one of [${expectedPaths.join(', ')}].
          Found: key = ${key}, path = ${path}`
        )
    })  
}

/**
 * Validates the herkin config's path object
 * @param {Object} paths 
 * @throws error if any paths are invalid
 */
const checkValidPathConfig = paths => {
  if (!isObj(paths))
    throw new HerkinConfigError(`Property "paths" must be an object. Found: ${paths}`)

  const expectedPaths = Object.keys(defaultConfig.paths)

  checkFilePaths(paths, expectedPaths)
}

module.exports.validateConfig = config => {
  if (!isObj(config))
    throw new HerkinConfigError(`Config must be an object. Found: ${config}`)

  // validates the config.paths object
  checkValidPathConfig(config.paths)

  return config
}