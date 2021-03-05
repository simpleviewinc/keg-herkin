const { execSync } = require('child_process')
const { template } = require('@keg-hub/jsutils')

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
 * @return {Object} object of template variable replacements
 */
const getTemplateVars = (env, herkinConfig) => {
  // get testRoot path to determine the path for acquiring the git repo of the client app
  const testRoot = herkinConfig.paths.testsRoot
  const branch = getGitBranchAt(testRoot)
  if (!branch)
    throw new Error(`Project located at ${testRoot} is not a git repository`)

  return { env, branch }
}

/**
 * Replaces the variables in `str`, if any, using options and the herkinConfig 
 * @param {string} str - template string
 * @param {Object} herkinConfig - herkin config object
 * @param {Object} options 
 * @param {string} options.env - current keg environment (e.g. local, staging, etc.) 
 * @return {string} string with variables replaced 
 */
const replaceTemplateVars = (str, herkinConfig, options={}) => {
  return str.match(/\$\{.*\}/)
    ? template(str, getTemplateVars(options.env, herkinConfig))
    : str
}

module.exports = {
  getTemplateVars,
  replaceTemplateVars
}