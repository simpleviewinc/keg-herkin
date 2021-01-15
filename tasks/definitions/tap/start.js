// const { launchAction } from './launch'
const { get, checkCall } = require('@keg-hub/jsutils')
const { sharedOptions } = require('../../utils/task/sharedOptions')
const { launch } = require('./launch')
const { yarn } = require('../../utils/process/process')

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
  const { params, herkin } = args
  const shouldLaunchBrowser = (params.launch && !params.headless)

  const { websocket } = shouldLaunchBrowser
    ? await checkCall(launch.action, args)
    : {}

  // console.log('waiting exmess')
  // await yarn('ex:mess')
  // console.log('exmess launched')

  // runs the start task using the cli, which will actually start the container
  await args.task.cliTask(args)
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
      'chrome',
      'firefox',
      'webkit',
      'headless',
      'log'
    ])
  }
}
