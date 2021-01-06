#!/usr/bin/env node

const { executeTask } = require('../utils/executeTask')
const { noOpObj, exists } = require('@keg-hub/jsutils')
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
  options: {
    context: {
      alias: [ 'name' ],
      enforce: true,
      allowed: [ `chromium`, `firefox`, `webkit` ],
      description: 'Context or name of the browser to launch',
      example: 'launch --context firefox',
      default: 'chromium',
    },
    chrome: {
      alias: [ 'chromium', 'chrom', 'ch' ],
      description: 'Launch the locally installed Chromium browser through Playwright',
      example: 'launch --chrome',
    },
    firefox: {
      alias: [ 'fire', 'fox', 'ff' ],
      description: 'Launch the locally installed Firefox browser through Playwright',
      example: 'launch --firefox',
    },
    webkit: {
      alias: [ 'webkit', 'safari', 'sa' ],
      description: 'Launch the locally installed Safari browser through Playwright',
      example: 'launch --webkit',
    },
    headless: {
      alias: [ 'hl' ],
      description: 'Launch the browser in headless mode',
      default: false,
      example: 'launch --no-headless',
    },
    log: {
      alias: [ 'lg' ],
      description: 'Log the browsers websocket after it\'s created',
      default: true,
      example: 'launch --no-log',
    },
    // TODO:  add other browser launch options here and in (tap.json) => keg.playwright.config
  }
}

module.exports = executeTask(launch)
