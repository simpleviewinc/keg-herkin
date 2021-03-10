const path = require('path')
const { execSync } = require('child_process')
const { snakeCase } = require('@keg-hub/jsutils')

let __REPO_PATHS
const rootDir = path.join(__dirname, '../')
const reposPath = path.join(rootDir, 'repos')

/**
 * Finds all sub-repo paths from the <herkin-root>/repos directory
 *
 * @return {Object} - Found repo paths converted into snakeCase
 */
const getRepoPaths = () => {
  if(__REPO_PATHS) return __REPO_PATHS

  // list of the herkin repo names located at `<root>/repos`
  const repos = execSync('ls', { cwd: reposPath })
    .toString()
    .split('\n')
    .filter(Boolean)

  // object of env names to repo paths, e.g. { MESSENGER_PATH: <path>, ...}
  __REPO_PATHS = repos.reduce(
    (values, name) => {
      const key = snakeCase(name + 'Path').toUpperCase()
      values[key] = path.join(reposPath, name)
      return values
    },
    { HERKIN_ROOT: rootDir, REPOS_PATH: reposPath }
  )

  return __REPO_PATHS
}


module.exports = {
  getRepoPaths
}