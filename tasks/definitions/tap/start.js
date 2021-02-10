const { sharedOptions } = require('@tasks/utils/task/sharedOptions')
const { launchBrowsers } = require('@tasks/utils/playwright/launchBrowsers')
const { snakeCase } = require('@keg-hub/jsutils')
const { validateConfig } = require('@tasks/utils/validation')

const getEnvName = pathName => `HERKIN_` + snakeCase(pathName).toUpperCase()

/**
 * Sets the env variables needed for mounting the
 * test directories into the container.
 * @see `container/docker-compose.yml`, `volumes` group
 * @param {Object} paths - object of keys and values
 */
const setMountEnvs = paths => {
  Object.entries(paths).map(([pathName, value]) => {
    const envName = getEnvName(pathName)
    process.env[envName] = value
  })
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
  const { params, herkin } = args

  validateConfig(herkin)

  params.launch && await launchBrowsers(params)

  setMountEnvs(herkin.paths)

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
