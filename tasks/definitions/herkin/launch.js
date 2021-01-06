#!/usr/bin/env node

const { noOpObj, exists } = require('@keg-hub/jsutils')
const { executeTask } = require('../utils/task/executeTask')
const { sharedOptions } = require('../utils/task/sharedOptions')
const { launchBrowser } = require('../utils/playwright/launchBrowser')

/**
* Gets the options to launch the Playwright browser based on passed in options and config settings
* @function
* @private
* @param {Object} params - Task params object, with Herkin params injected
*
* @returns {Object} - Options for launching the Playwright browser
*/
const getLaunchOptions = ({ playwright=noOpObj, ...params }) => {
  const {
    context,
    chrome,
    firefox,
    webkit,
    headless,
  } = params

  const {
    allowed,
    type:defBrowser,
    ...serverOptions
  } = playwright.browser

  return {
    allowed,
    ...serverOptions,
    browser: chrome || firefox || webkit || defBrowser || context,
    headless: exists(headless) ? headless : serverOptions.headless,
  }

}

/**
* Launches a Playwright browser based on passed in options and config settings
* @function
* @private
* @param {Object} args - Task arguments
*
* @returns {Object} - Browser launch options and websocket endpoint
*/
const launchAction = async (args) => {

  const launchOptions = getLaunchOptions(args.herkin)
  const websocket = await launchBrowser(launchOptions)
  
  return {
    websocket,
    launchOptions
  }
}

const launch = {
  name: 'launch',
  action: launchAction,
  example: 'yarn test:launch',
  description : 'Launch a locally installed browser',
  options: sharedOptions('launch', {
    context: {
      alias: [ 'name' ],
      enforce: true,
      allowed: [ `chromium`, `firefox`, `webkit` ],
      description: 'Context or name of the browser to launch',
      example: 'launch --context firefox',
      default: 'chromium',
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

module.exports = executeTask(launch)
