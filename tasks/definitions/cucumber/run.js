const { dockerExec } = require('@tasks/utils/process/process')
const { launchBrowsers } = require('@tasks/utils/playwright/launchBrowsers') 
const { sharedOptions } = require('@tasks/utils/task/sharedOptions')
const { runSeq } = require('@keg-hub/jsutils')
const path = require('path')

/**
 * Builds the arguments that are passed to jest when the test is run
 * @param {Object} params - Parsed task definition options
 *                          See options section of the task definition below
 */
const buildCmdArgs = params => {
  const { context: name, jestConfig, testDir, timeout } = params

  const cmdArgs = [ 'npx', 'jest', '--detectOpenHandles' ]
  const docTapPath = '/keg/tap'
  jestConfig && cmdArgs.push(`--config=${path.join(docTapPath, jestConfig)}`)
  testDir && cmdArgs.push(`--rootDir=${path.join(docTapPath, testDir)}`)
  timeout && cmdArgs.push(`--testTimeout=${timeout}`)
  name && cmdArgs.push(name)

  return cmdArgs
}

/**
 * Run cucumber tests in container
 * @param {Object} args 
 */
const runTest = async args => {
  const { params } = args
  const { browsers } = await launchBrowsers(params)
  const cmdArgs = buildCmdArgs(params)

  const commands = browsers.map(browser => 
    () => dockerExec(params.container, cmdArgs, { 
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
        default: 'keg-herkin',
      },
      timeout: {
        description: 'Test timeout. Defaults to no timeout, so that async playwright tasks have sufficient time to complete.',
        default: Math.pow(10, 10) // jest accepts neither Infinity nor -1 nor null to disable timeout, so we just default to 32 years
      },
      jestConfig: {
        description: 'Path to jest config within the docker container',
        default: 'configs/jest.cucumber.config.js'
      },
      testDir: {
        description: 'Path to the tests directory within the docker container',
        default: 'tests/bdd'
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
