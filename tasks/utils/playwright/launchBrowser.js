#!/usr/bin/env node
/**
 * Script should be run on the HOST machine, NOT with in the docker container
 * Starts the playwright chromium server on the HOST machine,
 * The `wsEndpoint` is then passed to the docker container as an ENV - BROWSER_WS_ENDPOINT
*/
const { Logger }  = require('@keg-hub/ask-it/src/logger')
const playwright = require('playwright')
const { noOpObj, exists, isEmpty, limbo } = require('@keg-hub/jsutils')
const metadata = require('./metadata')

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

const getBrowserServer = async (browserType, launchOptions, log) => {
  const { type, endpoint='' } = metadata.read()

  log && Logger.empty()

  // If an endpoint is already saved to the system, and the previously launched
  // browser matches `browserType`, then just try connecting to that launched
  // browser. If you can connect, close the connection and do nothing else.
  if (!isEmpty(endpoint) && browserType === type) {
    const [ err, browser ] = await limbo(
      playwright[type].connect({ wsEndpoint: endpoint })
    )

    if (!err && browser.isConnected()) {
      log && Logger.log(`Using previously-launched browser on host machine...`)
      browser.close()
      return null
    }
  }

  // Otherwise, launch the browser.
  log && Logger.log(`Starting browser on host machine...`)
  return playwright[browserType].launchServer(launchOptions)
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
  const browserServer = await getBrowserServer(browserType, {
    ...defConfig.serverOptions,
    ...serverOptions,
  }, log)

  if (!browserServer) return

  const wsEndpoint = browserServer.wsEndpoint()
  if(!wsEndpoint)
    throw new Error(`Could not get the websocket endpoint from the browser server!`)

  log && logWebsocket(wsEndpoint, browserType)

  // Save the playwright browser metadata to the browser-meta.json, to be used in the container.
  metadata.save(
    browserType, 
    wsEndpoint
  )

  return wsEndpoint
}


module.exports = {
  launchBrowser
}