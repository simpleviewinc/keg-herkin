const { sharedOptions } = require('../../utils/task/sharedOptions')
const { launchBrowsers } = require('../../utils/playwright/launchBrowsers')

/**
* Launches a Playwright browser based on passed in options and config settings
* @function
* @private
* @param {Object} args - Task arguments
*
* @returns {Object} - Browser launch options and websocket endpoint
*/
const launchAction = async (args) => {
  const { params } = args

  const websockets = await launchBrowsers(params)

  return {
    websockets,
  }
}

module.exports = {
  launch: {
    name: 'launch',
    alias: [ 'lch' ],
    action: launchAction,
    example: 'yarn test:launch',
    description : 'Launch one or more locally installed browsers',
    // TODO:  add other browser launch options here and in (tap.js) => keg.playwright.config
    options: sharedOptions('launch', {}, [
      'allBrowsers',
      'chromium',
      'firefox',
      'webkit',
      'headless',
      'log'
    ])
  }
}
