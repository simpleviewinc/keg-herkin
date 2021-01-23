const { createTemplate } = require('../tasks/utils/wolf/createTemplate')
const templateFile = process.env.WOLF_TEMPLATE_FILE || 'tasks/utils/wolf/qawolf.template.js'

module.exports = {
  config: 'node_modules/qawolf/js-jest.config.json',
  rootDir: 'tests/wolf',
  testTimeout: 60000,
  useTypeScript: false,
  createTemplate: (props) => createTemplate({...props, templateFile}),
}
