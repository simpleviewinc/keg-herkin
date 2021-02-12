const path = require('path')
const { snakeCase } = require('@keg-hub/jsutils')

const rootDir = path.join(__dirname, '../')
const reposPath = path.join(rootDir, 'repos')

const repos = [
  'backend',
  'example',
  'messenger',
  'tap',
  'testUtils'
]

const repoPaths = repos.reduce(
  (values, name) => {
    const key = snakeCase(name + 'Path').toUpperCase()
    values[key] = path.join(reposPath, name)
    return values
  },
  {}
)

module.exports = {
  HERKIN_ROOT: rootDir,
  REPOS_PATH: reposPath,
  ...repoPaths,
}