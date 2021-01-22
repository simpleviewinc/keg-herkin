const { createTemplate } = require('../tasks/utils/wolf/createTemplate')

module.exports = {
  config: 'node_modules/qawolf/js-jest.config.json',
  rootDir: 'tests/wolf',
  testTimeout: 60000,
  useTypeScript: false,
  createTemplate,
}
