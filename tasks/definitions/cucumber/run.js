const { dockerExec } = require('../../utils/process/process')
const { launchBrowsers } = require('../../utils/playwright/launchBrowsers') 
const { sharedOptions } = require('../../utils/task/sharedOptions')
const { runSeq } = require('../../utils/task/runSeq')

const runTest = async (args) => {
  const { params } = args
  const { context: name } = params

  const { browsers } = await launchBrowsers(params)

  const cmd = [
    'npx',
    'jest',
    '--config=/keg/tap/configs/jest-qawolf.config.js',
    '--rootDir=/keg/tap/tests/bdd/',
    `--testTimeout=${params.timeout}`,
    `features/${name}`
  ]

  const commands = browsers.map(browser => 
    () => dockerExec(params.container, cmd, { 
      envs: {
        HOST_BROWSER: browser
      }
    })
  )

  return runSeq(commands)
}

module.exports = {
  run: {
    name: 'run',
    action: runTest,
    example: 'keg herkin cucumber run',
    description : 'Runs cucumber tests',
    alias: ['test'],
    options: sharedOptions('run', {
      context: {
        alias: [ 'name' ],
        description: 'Name of the test to be run. If not passed, all tests are run',
        required: true,
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
      timeout: {
        description: 'Test timeout',
        default: 1000000
      }
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
