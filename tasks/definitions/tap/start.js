const { sharedOptions } = require('../../utils/task/sharedOptions')
const { launchBrowsers } = require('../../utils/playwright/launchBrowsers')

const browserParams = [
  'allBrowsers',
  'chromium',
  'firefox',
  'webkit'
]

const hasBrowserSpecified = params => 
  Object.keys(params).some(key => browserParams.includes(key) && params[key])

const paramsWithDefaults = params => ({
  ...params,
  // chromium defaulting to true, but only if no browser
  // was specified in params
  chromium: hasBrowserSpecified(params) 
    ? params.chromium
    : true
})

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
  const launchParams = paramsWithDefaults(args.params)

  launchParams.launch && await launchBrowsers(launchParams)

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
      'headless',
      'log',
      ...browserParams
    ])
  }
}
