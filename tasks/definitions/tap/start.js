const { sharedOptions } = require('HerkinTasks/utils/task/sharedOptions')
const { launchBrowsers } = require('HerkinTasks/utils/playwright/launchBrowsers')
const { setMountEnvs } = require('HerkinTasks/utils/envs/setMountEnvs')
const { validateConfig } = require('HerkinTasks/utils/validation')

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

  validateConfig(herkin)

  params.launch && await launchBrowsers(params)

  setMountEnvs(herkin, { 
    path: params.config || process.cwd(), 
    env: params.env 
  })

  args.task.cliTask(args)
}

module.exports = {
  start: {
    name: 'start',
    alias: ['st'],
    action: startHerkin,
    example: 'test:start',
    // Merge the default task options with these custom task options
    mergeOptions: true,
    description : 'Starts all services. (Local Webserver and Docker Container)',
    options: sharedOptions('start', {
        launch: {
          description: 'Launch a playwright websocket to allow remote connections to the browser.\nNot valid in headless mode.',
          example: 'start --no-launch',
          default: true,
        },
        config: {
          description: 'Path to the user herkin.config.js. If omitted, keg-herkin will look in your current working directory for a herkin config.',
          example: 'keg herkin start --config my-repo/herkin.config.js',
        },
        warn: {
          alias: ['warn'],
          description: 'See additional warnings (like for a missing herkin config)',
          example: 'keg herkin start --config my-repo/herkin.config.js --no-warn',
          default: true,
        },
    }, [
      'headless',
      'log',
      'allBrowsers',
      'chromium',
      'firefox',
      'webkit'
    ])
  }
}
