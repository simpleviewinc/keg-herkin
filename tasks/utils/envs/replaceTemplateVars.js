const { execSync } = require('child_process')
const { template, get } = require('@keg-hub/jsutils')
const { getTapConfig } = require('@keg-hub/cli-utils')

/**
 * @param {String} path - client app path
 * @returns {String} - tap alias for tap at path
 */
const getAppAlias = path => get(
  getTapConfig({ path })[0], 
  'keg.alias'
)

/**
 * @param {String} path - file path
 * @return {string?} the git branch name of the projectl located at `path`
 */
const getGitBranchAt = path => {
  let branch = null
  try {
    const branchBuffer = execSync(`git -C ${path} branch --show-current`)
    branch = branchBuffer.toString().trim()
  }
  catch (err) {
    console.warn(err.message)
  }
  return branch
}

/**
 * @param {string} env - current keg environment (e.g. local, staging, etc.)
 * @param {Object} config - herkin config
 * @param {string} appPath - path to client app
 * @return {Object} object of template variable replacements
 */
const getTemplateVars = (env, herkinConfig, appPath) => {
  // get testRoot path to determine the path for acquiring the git repo of the client app
  const testRoot = herkinConfig.paths.testsRoot
  const branch = getGitBranchAt(testRoot)
  if (!branch)
    throw new Error(`Project located at ${testRoot} is not a git repository`)
  
  const alias = getAppAlias(appPath)

  return { env, branch, alias }
}

/**
 * Replaces the variables in `str`, if any, using options and the herkinConfig 
 * @param {string} str - template string
 * @param {Object} herkinConfig - herkin config object
 * @param {Object} options 
 * @param {string} options.env - current keg environment (e.g. local, staging, etc.) 
 * @param {string} options.path - client app path
 * @return {string} string with variables replaced 
 */
const replaceTemplateVars = (str, herkinConfig, options={}) => {
  return str.match(/\$\{.*\}/)
    ? template(str, getTemplateVars(options.env, herkinConfig, options.path))
    : str
}

module.exports = {
  getTemplateVars,
  replaceTemplateVars
}