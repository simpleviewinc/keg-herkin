const { createTemplate } = require('../tasks/utils/wolf/createTemplate')
const path = require('path')
const { pipeline } = require('@keg-hub/jsutils')

const IS_CUCUMBER = process.env.WOLF_TEMPLATE === 'cucumber' 
const TIMEOUT = IS_CUCUMBER
  ? process.env.CUCUMBER_TIMEOUT || Math.pow(10, 6)
  : 60 * 1000

let FEATURE = undefined;
try {
 FEATURE = path.resolve(process.env.KEG_FEATURE_PATH)
}
catch (err) {}

const templateFile = IS_CUCUMBER
  ? 'tasks/utils/wolf/qawolf-cucumber.template.js'
  : 'tasks/utils/wolf/qawolf-jest.template.js'

const rootDir = IS_CUCUMBER
  ? 'tests/bdd/features/steps'
  : 'tests/wolf'

module.exports = {
  rootDir,
  testTimeout: TIMEOUT,
  useTypeScript: false,
  createTemplate: props => {
    if (IS_CUCUMBER && !FEATURE)
      throw new Error('Cannot create the cucumber test without the feature file defined in process.env.KEG_FEATURE_PATH')
    const body = IS_CUCUMBER && generateTestBlock()
    return createTemplate({ 
      ...props, 
      templateFile, 
      body, 
      timeout: TIMEOUT,
      feature: process.env.KEG_FEATURE_PATH
    })
  }
}

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

const withTimeout = lines => {
  lines[lines.length - 1] = `\t}, ${TIMEOUT});`
  return lines
}

const generateTestBlock = () => {
  const { loadFeature, generateCodeFromFeature } = require('jest-cucumber')
  const featurePath = process.env.KEG_FEATURE_PATH
  const feature = loadFeature(featurePath)
  const scenarioLine = feature.scenarios[0].lineNumber
  const code = generateCodeFromFeature(feature, scenarioLine)
  return pipeline(
    code.split(/\n/),
    withAsyncCreateHandles,
    withTimeout,
    lines => lines.join('\n')
  )
}
