// const { launchAction } from './launch'
const { get, checkCall } = require('@keg-hub/jsutils')
const { sharedOptions } = require('../../utils/task/sharedOptions')

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
  const launchSocket = (params.launch && !params.headless)

  launchSocket &&
    await checkCall(get(args, 'tasks.tap.tasks.launch.action'), args)


  // await args.task.cliTask(args)

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
      // TODO:  add other browser launch options here and in (tap.json) => keg.playwright.config
    }, [
      'chrome',
      'firefox',
      'webkit',
      'headless',
      'log'
    ])
  }
}
