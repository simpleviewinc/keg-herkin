const { dockerCmd } = require('HerkinTasks/utils/process/dockerCmd')
const { launchBrowser } = require('HerkinTasks/utils/playwright/launchBrowser') 

const createTest = async args => {
  const { params } = args
  const { url, name, container, launch } = params

  // TODO: Update to create a new test file using playwright record functionality
  // Which allows recording actions in the browser as they happend 
  
  // ensure a non-headless chromium instance is running
  await launchBrowser({ browser: 'chromium', headless: false, launch })
  // return dockerCmd(container, ` create ${url} ${name}`)
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
      launch: {
        description: 'Launch a playwright websocket to allow remote connections to the browser.\nNot valid in headless mode.',
        example: 'start --launch',
        default: false,
      },
    }
  }
}