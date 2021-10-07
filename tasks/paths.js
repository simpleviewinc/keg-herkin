const path = require('path')
const appRoot = path.join(__dirname, '../')

module.exports = {
  appRoot,
  configs: path.join(appRoot, './configs'),
}