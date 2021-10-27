const { dockerCmd } = require('HerkinTasks/utils/process/dockerCmd')
const { launchBrowsers } = require('HerkinTasks/utils/playwright/launchBrowsers') 
const { sharedOptions } = require('HerkinTasks/utils/task/sharedOptions')
const { buildArguments } = require('HerkinTasks/utils/task/buildArguments')

/**
 * Builds the Playwright test command
 * @param {Object} params 
 * @returns {Array<string>} - array of cli args
 */
const buildTestArguments = (params) => {
  const { 
    headless, 
    sync,
    firefox,
    chromium,
    webkit,
    allBrowsers,
  } = params

  const args = {
    headless,
    chromium,
    webkit,
    firefox
  }

  if (allBrowsers || (firefox && chromium && webkit)) {
    args['all-browsers'] = allBrowsers
  } 
  if (sync) args['runInBand'] = sync

  return buildArguments(args)
}

const runTest = async (args) => {
  const { params } = args
  const { context: name } = params

  await launchBrowsers(params)
  const cmdOptions = buildTestArguments(params)

  // TODO: Add command to run playwright recorded tests
  // return dockerCmd(params.container, [`npx`, `playwright`, `test`, name, ...cmdOptions])
}

module.exports = {
  run: {
    name: 'run',
    action: runTest,
    example: 'yarn test:run',
    description : 'Runs all or defined QAWolf tests',
    alias: ['test'],
    options: sharedOptions('run', {
      context: {
        alias: [ 'name' ],
        description: 'Name of the test to be run. If not passed, all tests are run',
        default: '.test.js',
      },
      sync: {
        description: 'Run all tests sequentially',
        alias: [ 'runInBand' ],
        example: `--sync`,
        default: false,
      },
      container: {
        description: 'Name of container within which to run create command',
        example: '--container keg-herkin',
        required: true,
        default: 'keg-herkin',
      },
      launch: {
        description: 'Launch a playwright websocket to allow remote connections to the browser.\nNot valid in headless mode.',
        example: 'start --launch',
        default: false,
      },
    }, [
      'allBrowsers',
      'chromium',
      'firefox',
      'webkit',
      'headless',
      'log',
    ])
  }
}
