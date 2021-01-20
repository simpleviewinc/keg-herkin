const { eitherArr } = require('@keg-hub/jsutils')
const { sharedOptions } = require('../../utils/task/sharedOptions')
const { launchBrowser } = require('../../utils/playwright/launchBrowser')

const runSeq = async (asyncFns=[]) => {
  const results = []
  for (const fn of asyncFns) {
    const result = await fn()
    results.push(result)
  }
  return results
}

/**
 * @param {Object} params - `start` action params
 * @return {Array<string>} - list of browsers to launch in the start task
 */
const getBrowsers = params => {
  const {
    firefox=false,
    chromium=false,
    webkit=false,
    browsers,
  } = params

  const browsersArr = eitherArr(browsers, browsers.split(/\s|,/gi))

  return Array.from(
    new Set([
      ...browsersArr,
      firefox && 'firefox',
      chromium && 'chromium',
      webkit && 'webkit'
    ])
  ).filter(Boolean)
}

const launchBrowsers = (browsers=[], launchParams) => {
  const launchFunctions = browsers.map(browser =>
    () => launchBrowser({
      browser,
      ...launchParams
    })
  )

  return runSeq(launchFunctions)
}

/**
 * Starts all the Keg-Herkin services needed to run tests
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Root task name
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {string} args.task - Task Definition of the task being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {string} args.params - Passed in options, converted into an object
 * @param {Array} args.herkin - Local config, injected into the task args
 *
 * @returns {void}
 */
const startHerkin = async (args) => {
  const { params }  = args
  const { headless, log } = params

  const browsers = getBrowsers(params)

  params.launch && await launchBrowsers(browsers, { headless, log })

  // runs the start task using the cli, which will actually start the container
  args.task.cliTask(args)
}

module.exports = {
  start: {
    name: 'start',
    alias: ['st'],
    action: startHerkin,
    example: 'test:start',
    description : 'Starts all services. (Local Webserver and Docker Container)',
    options: sharedOptions('start', {
        launch: {
          description: 'Launch a playwright websocket to allow remote connections to the browser.\nNot valid in headless mode.',
          example: 'start --no-launch',
          default: true,
        },
      // TODO:  add other browser launch options here and in (tap.js) => keg.playwright.config
    }, [
      'browsers',
      'chromium',
      'firefox',
      'webkit',
      'headless',
      'log'
    ])
  }
}
