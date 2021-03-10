const path = require('path')
const rootDir = path.join(__dirname, '../')

const serverConfig = {
  port: '5005',
  host: '0.0.0.0',
  path: '/sockr-socket',
  process: {
    debug: true,
    root: rootDir,
    script: path.join(rootDir, 'scripts/sockr.cmd.sh'),
  }
}

module.exports = {
  serverConfig
}