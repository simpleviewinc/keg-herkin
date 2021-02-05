const { dockerExec } = require('../../utils/process/process')
const { launchBrowsers } = require('../../utils/playwright/launchBrowsers') 
const { sharedOptions } = require('../../utils/task/sharedOptions')
const { runSeq } = require('@keg-hub/jsutils')

/**
 * Run cucumber tests in container
 * @param {Object} args 
 */
const runTest = async args => {
  const { params } = args
  const { context: name } = params

  const { browsers } = await launchBrowsers(params)

  const cmd = [
    'npx',
    'jest',
    `--config=${params.jestConfig}`,
    `--rootDir=${params.rootDir}`,
    `--testTimeout=${params.timeout}`,
    name || ''
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
        description: 'Name of the test to be run. If not passed-in, all tests are run',
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
        description: 'Test timeout. Defaults to no timeout, so that async playwright tasks have sufficient time to complete.',
        default: Math.pow(10, 10) // jest accepts neither Infinity nor -1 nor null to disable timeout, so we just default to 32 years
      },
      jestConfig: {
        description: 'Path to jest config',
        default: '/keg/tap/configs/jest.cucumber.config.js'
      },
      rootDir: {
        description: 'Path to root directory for jest tests',
        default: '/keg/tap/tests/bdd/features'
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
