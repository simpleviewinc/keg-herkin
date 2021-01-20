const { dockerExec } = require('../../utils/process/process')
const { launchBrowser } = require('../../utils/playwright/launchBrowser') 
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

  return [
    sync && '--runInBand',
    headless && '--headless',
    (allBrowsers || firefox) && '--firefox',
    (allBrowsers || chromium) && '--chromium',
    (allBrowsers || webkit) && '--webkit',
    name,
  ].reduce(
    (all, opt) => {
      opt && all.push(opt)
      console.log(opt)
      return all
    },
    []
  )
}

const runTest = async (args) => {
  const { params } = args

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
    ])
  }
}
