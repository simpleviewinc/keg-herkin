const { sharedOptions } = require('HerkinTasks/utils/task/sharedOptions')
const { launchBrowsers } = require('HerkinTasks/utils/playwright/launchBrowsers')

/**
 * Attach to the running keg-tap container
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const attachHerkin = async (args) => {
  const { params } = args
  await launchBrowsers(params)

  return await args.task.cliTask(args)
}

module.exports = {
  attach: {
    name: 'attach',
    alias: [ 'att' ],
    action: attachHerkin,
    example: 'keg herkin attach',
    description : 'Attach to the running tap container',
    // Merge the default task options with these custom task options
    mergeOptions: true,
    options: sharedOptions('start', {
      launch: {
        description: 'Launch a playwright websocket to allow remote connections to the browser.\nNot valid in headless mode.',
        example: 'attach --launch',
        default: false,
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
