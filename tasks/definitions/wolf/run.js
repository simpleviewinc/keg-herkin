const { dockerExec } = require('../../utils/process/process')
const { launchBrowsers } = require('../../utils/playwright/launchBrowsers') 
const { sharedOptions } = require('../../utils/task/sharedOptions')

const buildTestArguments = (params) => {
  const { 
    context: name, 
    headless, 
    sync,
    firefox,
    chromium,
    webkit,
    allBrowsers,
  } = params

  // get a list of qawolf "test" command arguments
  return [
    sync && '--runInBand',
    headless && '--headless',
    (allBrowsers || firefox) && '--firefox',
    (allBrowsers || chromium) && '--chromium',
    (allBrowsers || webkit) && '--webkit',
    name,
  ].filter(Boolean)
}

const runTest = async (args) => {
  const { params } = args

  await launchBrowsers(params)

  const cmdOptions = buildTestArguments(params)

  return dockerExec(params.container, [`npx`, `qawolf`, `test`, ...cmdOptions])
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
