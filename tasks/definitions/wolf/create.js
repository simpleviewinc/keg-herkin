const { dockerExec } = require('../../utils/process/process')
const { launchBrowser } = require('../../utils/playwright/launchBrowser') 

const createTest = async args => {
  const { params } = args
  const { url, name, container, cucumber, feature } = params

  // ensure a non-headless chromium instance is running
  await launchBrowser({ browser: 'chromium', headless: false })

  dockerExec(
    container, 
    [
      `-e KEG_FEATURE_PATH=${feature}`,
      `-e WOLF_TEMPLATE=${cucumber ? 'cucumber' : 'jest'}`,
      `npx qawolf create ${url} ${name}`,
    ].join(' ')
  )
}

module.exports = {
  create: {
    name: 'create',
    action: createTest,
    example: 'yarn test:create',
    description : 'Creates a new QAWolf test based on the passed in context and url',
    options: {
      name: {
        alias: [ 'context' ],
        description: 'Name of the test to be created',
        required: true,
      },
      url: {
        description: 'Url of the site there the test should be run',
        example: '--url http://my.test.site',
        required: true,
      },
      feature: {
        description: 'Path to feature file. Only used if --cucumber is true.',
        example: '--feature tests/bdd/features/google.feature',
        required: false,
        default: '',
      },
      cucumber: {
        description: 'If set, will create a cucumber-jest test file.',
        example: '--cucumber',
        default: false,
      },
      container: {
        description: 'Name of container within which to run create command',
        example: '--container keg-herkin',
        required: true,
        default: 'keg-herkin',
      },
      device: {
        description: 'Device to run the test on. See device list here => https://github.com/microsoft/playwright/blob/master/src/server/deviceDescriptors.ts',
        example: '--device \"iPad Mini\"',
      },
    }
  }
}