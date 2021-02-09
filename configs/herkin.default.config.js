const path = require('path')
const rootDir = path.join(__dirname, '../')

module.exports = {
  paths: {
    rootDir,
    stepsDir: path.join(rootDir, 'repos/testUtils/steps'),
    testsRoot: path.join(rootDir, 'tests'),
    featuresDir: path.join(rootDir, 'repos/testUtils/features'),
    unitDir: path.join(rootDir, 'tests/unit'),
    wolfDir: path.join(rootDir, 'repos/example/tests/wolf'),
  },
  server: {
    port: '5005',
    host: '0.0.0.0'
  }
}

// TODO:
// testsFolder -> unitFolder tests/unit

// KEG_HERKIN_PATH -> HERKIN_CONFIG_PATH 

// vscode://file/Users/michael.carolin/keg-hub/taps/keg-herkin/repos/backend/config.js:6 should use herkin-config, or just delete this file,
// it's basically doing what the herkin.cofnig.js is/should be doing
