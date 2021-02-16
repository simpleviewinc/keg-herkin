const path = require('path')
const { snakeCase, deepFreeze } = require('@keg-hub/jsutils')
const { execSync } = require('child_process')

const rootDir = path.join(__dirname, '../')
const reposPath = path.join(rootDir, 'repos')

// list of the herkin repo names located at `<root>/repos`
const repos = execSync('ls', { cwd: reposPath })
  .toString()
  .split('\n')
  .filter(Boolean)

// object of env names to repo paths, e.g. { MESSENGER_PATH: <path>, ...}
const repoPaths = repos.reduce(
  (values, name) => {
    const key = snakeCase(name + 'Path').toUpperCase()
    values[key] = path.join(reposPath, name)
    return values
  },
  {}
)

/**
 * Constants that should only be imported in a node runtime environment, the backend
 */
module.exports = deepFreeze({
  HERKIN_ROOT: rootDir,
  REPOS_PATH: reposPath,
  ...repoPaths,
})