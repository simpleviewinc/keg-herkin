const path = require('path')
const rootDir = path.join(__dirname, '../')

const serverConfig = {
  port: '5005',
  host: '0.0.0.0',
  path: '/sockr-socket',
  process: {
    root: rootDir,
  }
}

module.exports = {
  serverConfig
}