const path = require('path')
const { runSeq, isNum, get, exists } = require('@keg-hub/jsutils')
const { dockerCmd } = require('HerkinTasks/utils/process/dockerCmd')
const { sharedOptions } = require('HerkinTasks/utils/task/sharedOptions')
const { buildReportPath } = require('HerkinTasks/utils/reporter/buildReportPath')
const { launchBrowsers } = require('HerkinTasks/utils/playwright/launchBrowsers') 
const { buildReportTitle } = require('HerkinTasks/utils/reporter/buildReportTitle')

const {
  // The env should only be set on the sockr.cmd.sh script
  // This way we know if it's coming from the herkin frontend
  HERKIN_RUN_FROM_UI
} = process.env

/**
 * Builds the arguments that are passed to jest when the test is run
 * @param {Object} params - Parsed task definition options
 *                          See options section of the task definition below
 */
const buildCmdArgs = params => {
  const { jestConfig, timeout, bail, context, filter, sync, noTests } = params

  const cmdArgs = [
    'npx',
    'jest',
    '--detectOpenHandles',
    '--no-cache',
  ]

  const docTapPath = '/keg/tap'
  jestConfig && cmdArgs.push(`--config=${path.join(docTapPath, jestConfig)}`)
  timeout && cmdArgs.push(`--testTimeout=${timeout}`)
  bail && cmdArgs.push('--bail')
  noTests && cmdArgs.push('--passWithNoTests')
  sync && cmdArgs.push('--runInBand')

  // If context is set use that as the only file to run
  context && cmdArgs.push(context)

  return cmdArgs
}

/**
 * Adds an env to the envs object when value exists
 * @param {Object} envs - Object to add the env to
 * @param {String} key - Name of the env to add
 * @return {String} value - Value of the env
 */
const addEnv = (envs, key, value) => {
  exists(value) && (envs[key] = value)

  return envs
}

/**
 * Builds the envs set in the command that runs a test
 * @param {String} browser - playwright browser name
 * @param {Object} params - `run` task params
 * @param {Object} reportPath - Path where the test report should be saved
 *
 * @return {Object} dockerCmd options object, with envs
 */
const buildCmdOpts = (browser, params, reportPath) => {
  const envs = {
    HOST_BROWSER: browser,
    JEST_HTML_REPORTER_INCLUDE_FAILURE_MSG: true,
    JEST_HTML_REPORTER_INCLUDE_SUITE_FAILURE: true,
  }

  addEnv(envs, 'DEBUG', params.debug && 'pw:api')
  addEnv(envs, 'HERKIN_FEATURE_TAGS', params.tags)
  addEnv(envs, 'HERKIN_FEATURE_NAME', params.filter)

  // Build the output path, and page title based on the passed in context
  // Uses the word "features" when no context is passed
  addEnv(envs, 'JEST_HTML_REPORTER_OUTPUT_PATH', reportPath)
  addEnv(envs, 'JEST_HTML_REPORTER_PAGE_TITLE', buildReportTitle('feature', params.context))

  return { envs }
}

/**
 * Exits the process, once the tests are complete
 * @param {Array<string|number>} exitCodes - exit code of each test in container
 */
const exitProcess = (exitCodes=[], reportPath) => {
  const codeSum = exitCodes.reduce((sum, code) => sum + parseInt(code), 0)

  // If not running from the UI, then print the view reports message
  !HERKIN_RUN_FROM_UI &&
    process.on('exit', () => {

      const reportSplit = reportPath.split('/')
      const name = reportSplit.pop().replace('.html', '')
      const type = reportSplit.pop()
      const url = `http://localhost:5005/reports/${type}/${name}`

      console.log('=====================================================\n')
      console.log('\x1b[33m%s\x1b[0m', 'View test report:', url) 
      console.log('\n=====================================================')
    })

  process.exit(codeSum)
}

/**
 * @param {Object} params - task params
 * @return {Object} launchParams - the task params with any updates needed 
 * to be compatible with browser launch params
 */
const buildLaunchParams = params => {
  let slowMo = parseInt(exists(HERKIN_TEST_SPEED) ? HERKIN_TEST_SPEED : KEG_TEST_SPEED)
  slowMo = slowMo || isNum(params.slowMo) ? params.slowMo * 1000 : undefined

  return { ...params, slowMo }
}

/**
 * Run parkin tests in container
 * @param {Object} args 
 */
const runTest = async args => {
  const { params } = args
  const reportsDir = get(args, 'herkin.paths.reportsDir')

  const launchParams = buildLaunchParams(params)
  const { browsers } = await launchBrowsers(launchParams)
  const cmdArgs = buildCmdArgs(params)
  const reportPath = buildReportPath('feature', params.context)

  const commands = browsers.map(browser => 
    () => dockerCmd(params.container, cmdArgs, buildCmdOpts(browser, params, reportPath))
  )

  const codes = await runSeq(commands)

  exitProcess(codes, reportPath)
}

module.exports = {
  run: {
    name: 'run',
    action: runTest,
    example: 'keg herkin bdd run',
    description : 'Runs bdd feature tests',
    alias: ['test'],
    options: sharedOptions('run', {
      filter: {
        alias: [ 'filters' ],
        description: 'Filters test (feature and scenario names) by this substring. If not passed, all tests are run. Does nothing when context option is passed',
        default: null
      },
      jestConfig: {
        description: 'Path to jest config relative to the root directory',
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
    }, [
      'context',
      'allBrowsers',
      'chromium',
      'firefox',
      'webkit',
      'headless',
      'log',
      'bail',
      'noTests',
      'slowMo',
      'timeout',
      'container',
      'sync',
    ])
  }
}
