const { createTemplate } = require('../tasks/utils/wolf/createTemplate')
const path = require('path')
const { pipeline } = require('@keg-hub/jsutils')

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

  const body = IS_CUCUMBER && generateTestBlock(FULL_FEATURE_PATH, TIMEOUT)

  return createTemplate({ 
    ...props, 
    body, 
    templateFile: TEMPLATE_FILE, 
    timeout: TIMEOUT,
    feature: KEG_FEATURE_PATH
  })
}

/**
 * Updates the generated code with qawolf.create 
 * calls and async modifiers
 * @param {Array<string>} lines - generated code split by new-line
 */
const withAsyncCreateHandles = lines => {
  const indices = lines.map((_, idx) => idx)

  const stepHandles = {
    given: 'given(', 
    when: 'when(', 
    then: 'then('
  }

  Object.values(stepHandles).map(handle => {
    const indicesOfHandles = indices.filter(idx => lines[idx].includes(handle))

    indicesOfHandles.map(idx => {
      lines[idx] = lines[idx].replace('/, (', '/, async (')
      lines[idx + 1] = handle === stepHandles.given
        ? '\t\tawait qawolf.create(arg0)'
        : '\t\t// await qawolf.create()'
    })
  })

  return lines
}

const withTimeout = (lines, timeout) => {
  lines[lines.length - 1] = `\t}, ${timeout});`
  return lines
}

/**
 * Generates the cucumber-jest test block, containing each
 * step definition for the specified feature path
 * @param {string} featurePath - path to feature file
 * @param {number} timeout - timeout for jest to wait
 */
const generateTestBlock = (featurePath, timeout) => {
  const { loadFeature, generateCodeFromFeature } = require('jest-cucumber')

  const feature = loadFeature(featurePath)
  if (!feature.scenarios.length)
    throw new Error('Cannot generate step definitions for a feature with no steps!')

  const scenarioLine = feature.scenarios[0].lineNumber
  const code = generateCodeFromFeature(feature, scenarioLine)

  return pipeline(
    code.split(/\n/),
    withAsyncCreateHandles,
    lines => withTimeout(lines, timeout),
    lines => lines.join('\n')
  )
}

const jestConfig = !IS_CUCUMBER
  ? undefined
  : {
    "moduleFileExtensions": [
      "feature",
      "js",
      "json",
      "ts",
      "tsx"
    ],
    "setupFilesAfterEnv": [
      "/keg/tap/node_modules/cucumber-jest/dist/init.js", // <--- *2
    ],
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      "^.+\\.(feature)$": "jest-cucumber" // <--- *3
    },
    "testMatch": [
      "/keg/tap/**/*.feature"
    ]
  }

module.exports = {
  rootDir: ROOT_DIR,
  testTimeout: TIMEOUT,
  useTypeScript: false,
  createTemplate: createDynamicTemplate,
  config: jestConfig
}