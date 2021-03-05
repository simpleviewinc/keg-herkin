const { dockerExec } = require('HerkinTasks/utils/process/process')
const { launchBrowsers } = require('HerkinTasks/utils/playwright/launchBrowsers') 
const { sharedOptions } = require('HerkinTasks/utils/task/sharedOptions')
const { runSeq, isNum } = require('@keg-hub/jsutils')
const path = require('path')

/**
 * Builds the arguments that are passed to jest when the test is run
 * @param {Object} params - Parsed task definition options
 *                          See options section of the task definition below
 */
const buildCmdArgs = params => {
  const { jestConfig, timeout, bail } = params

  const cmdArgs = [ 'npx', 'jest', '--detectOpenHandles' ]
  const docTapPath = '/keg/tap'
  jestConfig && cmdArgs.push(`--config=${path.join(docTapPath, jestConfig)}`)
  timeout && cmdArgs.push(`--testTimeout=${timeout}`)
  bail && cmdArgs.push('--bail')


  // see <root>/scripts/runParkin.js
  cmdArgs.push('runParkin.js')

  return cmdArgs
}

/**
 * Builds the envs set in the command that runs a test
 * @param {String} browser - playwright browser name
 * @param {Object} params - `run` task params
 * @return {Object} dockerExec options object, with envs
 */
const buildCmdEnvs = (browser, params) => ({
  envs: {
    HOST_BROWSER: browser,
    ...(params.context && { HERKIN_FEATURE_NAME: params.context }),
    ...(params.tags && { HERKIN_FEATURE_TAGS: params.tags }),
    ...(params.debug && { DEBUG: 'pw:api' })
  }
})

/**
 * Exits the process, once the tests are complete
 * @param {Array<string|number>} exitCodes - exit code of each test in container
 */
const exitProcess = (exitCodes=[]) => {
  const codeSum = exitCodes.reduce((sum, code) => sum + parseInt(code), 0)

  process.exit(codeSum)
}

/**
 * @param {Object} params - task params
 * @return {Object} launchParams - the task params with any updates needed 
 * to be compatible with browser launch params
 */
const buildLaunchParams = params => ({
  ...params,
  slowMo: isNum(params.slowMo)
    ? params.slowMo * 1000  // seconds to ms conversion
    : undefined
})

/**
 * Run parkin tests in container
 * @param {Object} args 
 */
const runTest = async args => {
  const { params } = args
  const launchParams = buildLaunchParams(params)
  const { browsers } = await launchBrowsers(launchParams)
  const cmdArgs = buildCmdArgs(params)

  const commands = browsers.map(browser => 
    () => dockerExec(params.container, cmdArgs, buildCmdEnvs(browser, params))
  )

  const codes = await runSeq(commands)

  exitProcess(codes)
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
        alias: [ 'name', 'filter' ],
        description: 'Filters test (feature and scenario names) by this substring. If not passed, all tests are run',
        default: null
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
        description: 'Test timeout in milliseconds. Defaults to no timeout, so that async playwright tasks have sufficient time to complete.',
        default: 5 * 1000 // 5 seconds
      },
      jestConfig: {
        description: 'Path to jest config within the docker container',
        default: 'configs/jest.parkin.config.js'
      },
      tags: {
        alias: ['tag'],
        description: 'Tags for filtering the features',
        example: '--tags @foo,@bar,@baz',
        default: null
      },
      debug: {
        description: 'Runs with playwright debug mode activated',
        example: 'keg herkin cr test --debug',
        default: false
      },
      slowMo: {
        alias: ['speed'],
        description: 'Playwright slow mo option, value in seconds',
        example: 'keg herkin cr test --slowMo 2.5',
      },
      bail: {
        description: 'Stops all tests once a single step fails',
        default: true
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
