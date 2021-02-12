const { createTemplate } = require('../tasks/utils/wolf/createTemplate')
const path = require('path')

const config = require('./getHerkinConfig').getHerkinConfig()
const jestTestPath = path.join(config.paths.testsRoot, config.paths.waypointDir)

const {
  JEST_TIMEOUT=(60*1000),
  JEST_TEST_PATH=jestTestPath,
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
  config: '/keg/tap/configs/jest.qawolf.config.js',
  useTypeScript: false,
}