#!/usr/bin/env node
/**
 * Script should be run on the HOST machine, NOT with in the docker container
 * Starts the playwright chromium server on the HOST machine,
 * The `wsEndpoint` is then passed to the docker container as an ENV - BROWSER_WS_ENDPOINT
*/
const { Logger }  = require('@keg-hub/ask-it/src/logger')
const playwright = require('playwright')
const { noOpObj, isStr, exists } = require('@keg-hub/jsutils')

/**
* Default config for starting the Playwright browser server
* @object
*/
const defConfig = {
  log: true,
  browser: 'chromium',
  browsers: [ 'chromium', 'firefox', 'webkit' ],
  serverOptions: {
    headless: false,
  }
}

/**
* Logs the websocket endpoint to the terminal
* @function
* @private
* @param {Object} wsEndpoint - Websocket endpoint of the started browser server
*
* @returns {void}
*/
const logWebsocket = (wsEndpoint, browserType) => {
  Logger.empty()
  Logger.pair(`Using browser: `, browserType)
  Logger.pair(`Using websocket-endpoint: `, wsEndpoint)
  Logger.empty()
}

/**
* Gets the browser type to be started
* @function
* @private
* @param {string} browser - Name of the browser to be started
* @param {Array} allowed - List of allowed browsers
*
* @returns {void}
*/
const getBrowserType = (browser, allowed) => {
  if(exists(browser) && !allowed.includes(browser))
    throw new Error(`The browser ${browser} is not allowed. Must be one of ${allowed.join(' | ')}`)

  return browser || defConfig.browser
}

/**
* Sets up listeners for browsers events
* @function
* @private
* @param {Object} browserServer - Browser instance created by Playwright
* @param {string} browser - Name of the browser
*
* @returns {void}
*/
const addBrowserEvents = (browserServer, browser) => {

  browserServer.on('disconnected', event => {
    Logger.empty()
    Logger.warn(`Host browser ${browser} has disconnected!`)
    Logger.empty()
    
    // If the browser disconnected, then exit it the process
    // Nothing we can do about it
    process.exit(0)
  })

}

/**
* Starts a Playwright Browser Server.
* <br/> Then gets the websocket endpoint for the server,
* <br/> adds it as an ENV `KEG_PLAYWRIGHT_WS`, and returns it
* <br/> For a list of all options, [Go here](https://playwright.dev/docs/api/class-browsertype/#browsertypelaunchoptions)
* @function
* @export
* @param {Object} config - Config for the browser server
* @param {boolean} [config.log=true] - Log the websocket endpoint
* @param {string} [config.browser='chromium'] - Browser type to start
* @param {Array} [config.browsers=[All browsers]] - Allowed browser to use
* @param {Object} [config.headless=false] - Run the browser in headless mode
*
* @returns {string} - Websocket endpoint of the started browser server
*/
const launchBrowser = async (config=noOpObj) => {
  const {
    log=defConfig.log,
    browser=defConfig.browser,
    allowed=defConfig.browsers,
    ...serverOptions
  } = config

  const browserType = getBrowserType(browser, allowed)

  log && Logger.empty()
  log && Logger.log(`Starting browser on host machine...`)

  const browserServer = await playwright[browserType].launchServer({
    ...defConfig.serverOptions,
    ...serverOptions,
  })

  const wsEndpoint = browserServer.wsEndpoint()
  if(!wsEndpoint)
    throw new Error(`Could not get the websocket endpoint from the browser server!`)

  log && logWebsocket(wsEndpoint, browserType)

  // Add the websocket to the current processes ENV's
  process.env['KEG_PLAYWRIGHT_WS'] = wsEndpoint

  return wsEndpoint
}


module.exports = {
  launchBrowser
}