const { createTemplate } = require('../tasks/utils/wolf/createTemplate')

const {
  JEST_TIMEOUT=(60*1000),
  JEST_TEST_PATH='/keg/tap/tests/wolf',
  TEMPLATE_PATH='/keg/tap/tasks/utils/wolf/qawolf-jest.template.js'
} = process.env

/**
 * Creates the template string used to generate the test file
 * @param {Object} props - params passed to this function by qawolf, with parameters like `device` 
 * @return {string} template 
 */
const createDynamicTemplate = props =>
  createTemplate({ 
    ...props, 
    templateFile: TEMPLATE_PATH, 
    timeout: JEST_TIMEOUT,
  })

module.exports = {
  createTemplate: createDynamicTemplate,
  rootDir: JEST_TEST_PATH,
  testTimeout: JEST_TIMEOUT,
  useTypeScript: false,
}