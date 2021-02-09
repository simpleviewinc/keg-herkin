const { sharedOptions } = require('@tasks/utils/task/sharedOptions')
const { launchBrowsers } = require('@tasks/utils/playwright/launchBrowsers')
const { snakeCase, isStr, isObj } = require('@keg-hub/jsutils')
const defaultConfig = require('@configs/herkin.default.config.js')
const path = require('path')

/**
 * Validates the herkin config's path object
 * @param {Object} paths 
 * @throws error if any paths are invalid
 */
const checkValidPathConfig = paths => {
  if (!isObj(paths))
    throw new Error(`Herkin paths config must be an object. Found: ${paths}`)

  const expectedPaths = Object.keys(defaultConfig.paths)

  Object
    .entries(paths)
    .map(([key, path]) => {
      const valid = isStr(path) && expectedPaths.includes(key)
      if (!valid)
        throw new Error(
          `Herkin config paths must be strings and keys must be one of [${expectedPaths.join(', ')}].
           Found: key = ${key}, path = ${path}`
        )
    })
}


/**
 * Sets the env variables needed for mounting the
 * test directories into the container.
 * @param {Object} paths - object of keys and values
 */
const setMountEnvs = paths => {

  checkValidPathConfig(paths)

  Object.entries(paths).map(([pathName, value]) => {
    if (!value) return
    const envName = 'HERKIN_' + snakeCase(pathName).toUpperCase()
    process.env[envName] = value
    console.log(envName, value)
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

  params.launch && await launchBrowsers(params)

  herkin && setMountEnvs(herkin.paths)

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
          description: 'Path to the user herkin.config.js',
          example: 'keg herkin start --config my-repo/herkin.config.js',
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
