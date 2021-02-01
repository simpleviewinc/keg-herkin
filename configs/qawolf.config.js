const { createTemplate } = require('../tasks/utils/wolf/createTemplate')
const path = require('path')

const {
  WOLF_TEMPLATE='jest',
  CUCUMBER_TIMEOUT=Math.pow(10, 6),
  JEST_TIMEOUT=(60*1000),
  KEG_FEATURE_PATH,
  CUCUMBER_TEST_PATH='tests/bdd/features/steps',
  JEST_TEST_PATH='tests/wolf'
} = process.env

const IS_CUCUMBER = WOLF_TEMPLATE === 'cucumber' 
const TIMEOUT = IS_CUCUMBER
  ? CUCUMBER_TIMEOUT
  : JEST_TIMEOUT

let FULL_FEATURE_PATH = undefined;
try {
  FULL_FEATURE_PATH = path.resolve(KEG_FEATURE_PATH)
}
catch (err) {}

const TEMPLATE_FILE = IS_CUCUMBER
  ? 'tasks/utils/wolf/qawolf-cucumber.template.js'
  : 'tasks/utils/wolf/qawolf-jest.template.js'

const ROOT_DIR = IS_CUCUMBER
  ? CUCUMBER_TEST_PATH
  : JEST_TEST_PATH


/**
 * Creates the template string used to generate the test file
 * @param {Object} props - params passed to this function by qawolf, with parameters like `device` 
 * @return {string} template 
 */
const createDynamicTemplate = props => {
  if (IS_CUCUMBER && !FULL_FEATURE_PATH)
    throw new Error('Cannot create the cucumber test without the feature file defined in process.env.KEG_FEATURE_PATH')

  return createTemplate({ 
    ...props, 
    templateFile: TEMPLATE_FILE, 
    timeout: TIMEOUT,
    feature: KEG_FEATURE_PATH
  })
}

const jestConfig = !IS_CUCUMBER
  ? undefined
  : require('./jest-qawolf.config.js')

module.exports = {
  rootDir: ROOT_DIR,
  testTimeout: TIMEOUT,
  useTypeScript: false,
  createTemplate: createDynamicTemplate,
  config: jestConfig
}