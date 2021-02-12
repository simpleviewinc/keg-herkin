const { dockerExec } = require('@tasks/utils/process/process')
const { launchBrowser } = require('@tasks/utils/playwright/launchBrowser') 

const createTest = async args => {
  const { params } = args
  const { url, name, container } = params

  // ensure a non-headless chromium instance is running
  await launchBrowser({ browser: 'chromium', headless: false })

  return dockerExec(container, `npx qawolf create ${url} ${name}`)
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