const metadata = require('./metadata')
const playwright = require('playwright')
const { findProc, killProc } = require('../proc')
const { Logger } = require('@keg-hub/cli-utils')
const { flatUnion } = require('../utils/flatUnion')
const { noOpObj, noPropArr, deepMerge, limbo, checkCall } = require('@keg-hub/jsutils')

/**
 * Cache holder for the launched playwright browser
 * @type {Object|undefined}
 */
let PW_SERVER

/**
 * Maps the browser types to the process names
 * @type {Object|undefined}
 */
const browserTypeMap = {
  chromium: 'chrome',
  chrome: 'chrome',
  firefox: 'firefox',
}

/**
 * Gets the browser server wesocket endpoint and caches it along with the type and launchParams
 * @function
 * @private
 * @param {string} type - Name of the browser to launch
 * @param {Object} launchParams - Browser server config
 *
 * @returns {string} - Websocket server url
 */
const configureWebsocket = async (type, launchParams) => {
  Logger.log(`- Configuring browser ${type} websocket...`)

  const wsEndpoint = PW_SERVER.wsEndpoint()
  // Save the playwright browser metadata to the <os-temp>/browser-meta.json, to be used for future connections
  await metadata.save(type, wsEndpoint, launchParams)

  return wsEndpoint
}

/**
 * Starts new browser server using the Playwright API
 * @function
 * @private
 * @param {string} type - Name of the browser to launch
 * @param {Object} launchParams - Browser server config
 *
 * @returns {Object} - Browser server reference
 */
const newSever = async (type, launchParams=noOpObj) => {
  Logger.log(`- Starting playwright server ${type}...`)
  // Launch the playwright server
  PW_SERVER = await playwright[type].launchServer(launchParams)

  // Save the server info to the metadata file
  await configureWebsocket(type, launchParams)
  
  return PW_SERVER
}

/**
 * Gets the current running status of browser server the process
 * @function
 * @throws
 * @param {string} type - Name of the browser server to get the status for
 *
 * @return {Object} - Process Status object
 */
const getServerStatus = async (type) => {
  const browser = browserTypeMap[type]
  if(!browser) throw new Error(`A browser type is required`)

  const [err, status] = await limbo(findProc(browser))

  return status
}

/**
 * Starts browser-server using playwright
 * See {@link https://playwright.dev/docs/api/class-browsertype#browser-type-launch-server|Playwright Docs} for more info
 * @function
 * @public
 * @param {Object} browserConf - Config used when launching the browser via playwright
 * @param {Array} browserConf.args - Arguments to pass to the browser on launch
 * @param {string} browserConf.type - Name of the browser to launch
 * @param {boolean} browserConf.active - Should the browser be started, must explicitly be set to false
 * @param {string} [browserConf.url=https://google.com] - Initial url the browser should navigate to
 * @param {Object} browserConf.config - Options to pass to the browser on launch
 * @param {boolean} isRecusion - Tracks if method call is in a recusrive loop
 *
 * @returns {Object} - Contains the page, context, and browser created from playwright
 */
const startServer = async (browserConf=noOpObj) => {
  const {
    type='chromium',
    args=noPropArr,
    config=noOpObj
  } = browserConf

  if(type === 'chrome') type = 'chromium'
  
  const status = await getServerStatus(type)

  if(status.pid){
    Logger.pair(`- Browser ${type} server already running with pid:`, status.pid)
    return (PW_SERVER = status)
  }

  const launchParams = deepMerge({
    slowMo: 50,
    devtools: true,
    headless: false,
    channel: `chrome`,
    downloadsPath: ``,
    args: flatUnion([
      `--disable-gpu`,
      `--disable-dev-shm-usage`,
      `--no-sandbox`,
      `--window-position=0,0`,
    ], args)
  }, config)

  PW_SERVER = PW_SERVER || await newSever(type, launchParams)

  return PW_SERVER
}

/**
 * Gets the cached browser server metadata
 * @function
 * @public
 * @param {string} [type] - Name of the browser metadata to get
 *
 * @returns {string} - Browser metadata
 */
const getServerMetadata = async type => {
  return await metadata.read(type)
}

/**
 * Stops the running browser server if it eixsts
 * @function
 * @public
 *
 * @returns {Void}
 */
const stopServer = async () => {
  // Wrap the close method incase something happens
  // We still want to reset the browser reference and meta data
  try {
    if(PW_SERVER){
      PW_SERVER.pid && killProc(PW_SERVER)
      PW_SERVER.close && await PW_SERVER.close()
    }
    else {
      await checkCall(async () => {
        // Kill both chrome and firefox
        const [errChrome, statusChrome] = await limbo(findProc('chrome'))
        statusChrome &&
          statusChrome.pid &&
          killProc(statusChrome)

        const [errFF, statusFF] = await limbo(findProc('firefox'))
        statusFF &&
          statusFF.pid &&
          killProc(statusFF)
      })
    }
  }
  catch(err){ Logger.error(err.message) }

  await metadata.remove()
  PW_SERVER = undefined
}


module.exports = {
  stopServer,
  startServer,
  getServerMetadata,
}