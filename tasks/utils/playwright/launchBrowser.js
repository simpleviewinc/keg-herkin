#!/usr/bin/env node
/**
 * Script should be run on the HOST machine, NOT with in the docker container
 * Starts the playwright chromium server on the HOST machine,
 * The `wsEndpoint` is then passed to the docker container as an ENV - BROWSER_WS_ENDPOINT
*/
const { Logger }  = require('@keg-hub/ask-it/src/logger')
const playwright = require('playwright')
const { noOpObj, exists, isEmpty, limbo } = require('@keg-hub/jsutils')
const { inDocker } = require('HerkinTasks/utils/helpers')
const metadata = require('./metadata')

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
 * Launches the browser server instance of the browserType and launch options
 * @param {String} browserType - one of 'chromium', 'firefox', or 'webkit'
 * @param {Object} launchOptions - see: https://playwright.dev/docs/api/class-browsertype?_highlight=launch#browsertypelaunchserveroptions
 * @param {boolean} log - if true, logs out stages of launch
 */
const launchBrowserServer = async (browserType, launchOptions, log) => {
  const { 
    endpoint='', 
    type: prevType, 
    launchOptions: prevOptions 
  } = metadata.read(browserType) || {}

  const isInContainer = inDocker()

  log && Logger.empty()

  const browserEndpoint = isInContainer
    ? endpoint.replace('127.0.0.1', 'host.docker.internal')
    : endpoint

  // check to see if the previous launch parameters match the current ones
  const launchParamsMatch = 
    !isEmpty(browserEndpoint)
    && browserType === prevType
    && launchOptions.headless === prevOptions.headless
    && launchOptions.slowMo === prevOptions.slowMo

  const browserName = `${launchOptions.headless ? 'headless ' : ''}${browserType}`

  // If launch params match, then just try connecting to that launched
  // browser. If you can connect, close the connection and do nothing else.
  if (launchParamsMatch) {
    const [ err, browser ] = await limbo(
      playwright[browserType].connect({ wsEndpoint: browserEndpoint })
    )

    if (!err && browser.isConnected()) {
      log && Logger.log(`==== Using previously-launched ${browserName} on host machine... ====`)
      browser.close()
      return null
    }
  }

  if (isInContainer)
    throw new Error(`Could not connect to the browser at ${browserEndpoint}. Exiting...`)

  // Otherwise, launch the browser.
  log && Logger.log(`==== Starting ${browserName} on host machine... ====`)
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
    log=true,
    browser='chromium',
    allowed=[ 'chromium', 'firefox', 'webkit' ],
    ...params
  } = config

  const launchParams = {
    headless: exists(config.headless) ? config.headless : true,
    ...params
  }

  const browserType = getBrowserType(browser, allowed)

  const browserServer = await launchBrowserServer(browserType, launchParams, log)
  if (!browserServer) return

  const wsEndpoint = browserServer.wsEndpoint()
  if(!wsEndpoint)
    throw new Error(`Could not get the websocket endpoint from the browser server!`)

  log && logWebsocket(wsEndpoint, browserType)

  // Save the playwright browser metadata to the browser-meta.json, to be used in the container.
  metadata.save(
    browserType, 
    wsEndpoint,
    launchParams
  )

  return wsEndpoint
}


module.exports = {
  launchBrowser
}