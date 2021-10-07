const playwright = require('playwright')
const { Logger } = require('@keg-hub/cli-utils')
const { flatUnion } = require('./utils/flatUnion')
const { noOpObj, noPropArr, deepMerge } = require('@keg-hub/jsutils')

/**
 * Cache holder for the launched playwright browser
 * @type {Object|undefined}
 */
let PW_BROWSER

/**
 * Cache holder for the launched playwright browser context
 * @type {Object|undefined}
 */
let PW_CONTEXT

/**
 * Cache holder for the opened playwright browser page
 * @type {Object|undefined}
 */
let PW_PAGE

/**
 * Starts new browser using the Playwright API
 * @function
 * @private
 * @param {string} type - Name of the browser to launch
 * @param {Array} args - Arguments to pass to the browser on launch
 * @param {Object} config - Options to pass to the browser on launch
 *
 * @returns {Object} - Contains the browser reference created from playwright
 */
const newBrowser = async (type='chromium', args=noPropArr, config=noOpObj) => {
  if(type === 'chrome') type = 'chromium'

  Logger.log(`- Starting playwright browser ${type}...`)
  // Reuse or launch the playwright browser
  PW_BROWSER = PW_BROWSER ||
    await playwright[type].launch(
      deepMerge({
        slowMo: 50,
        devtools: true,
        headless: false,
        channel: `chrome`,
        args: flatUnion([
          `--disable-gpu`,
          `--disable-dev-shm-usage`,
          `--no-sandbox`,
          `--window-position=0,0`,
        ], args)
      }, config)
    )
  
  return { browser: PW_BROWSER }
}

/**
 * Starts new browser context from the running browser
 * @function
 * @private
 * @param {Object} browserConf - Config used when starting the browser via playwright
 * @param {boolean} isRecusion - Tracks if method call is in a recusrive loop
 *
 * @returns {Object} - Contains the context, and browser created from playwright
 */
const newBrowserContext = async (browserConf, isRecusion) => {
  if(!PW_BROWSER){
    // Ensure we do not enter a recursive loop
    // This should never happen, but just incase we throw when in a recursive loop
    if(isRecusion)
      throw new Error(
        `Could not create new browser context. The playwright browser is not starting properly.`
      )

    // Pass in true, so we know we've started a potential recursive loop
    // When startBrowser method calls this method
    // If the browser was not created before the call,
    // Then we throw an error to avoid a stack overflow error when the browser can't start
    return await startBrowser(browserConf, true)
  }

  PW_CONTEXT = PW_CONTEXT || await PW_BROWSER.newContext()

  return { browser: PW_BROWSER, context: PW_CONTEXT }
}

/**
 * Creates a new page from the current context and navigates to the passed in url
 * Also ensure the context exists before creating the page
 * @function
 * @private
 * @param {string} [url=https://google.com] - Initial url the browser should navigate to
 *
 * @returns {Object} - Contains the page, context created from playwright
 */
const newBrowerPage = async url => {
  if(!PW_CONTEXT) await newBrowserContext()

  // If there's no page set, then recreate it, and goto the passed in url
  if(!PW_PAGE){
    PW_PAGE = await PW_CONTEXT.newPage()
    // Default routing to google.com
    // This helps with start times
    // By warming up the browser before it's actually used for something else
    await PW_PAGE.goto(url || `https://google.com`)
  }
  else if(url) await PW_PAGE.goto(url)
  
  return { context: PW_CONTEXT, page: PW_PAGE }
}

/**
 * Closes the current browser reference
 * Resets all the cache holders to undefined
 * @function
 * @public
 *
 * @return {Void}
 */
const stopBrowser = async () => {
  // Ensure the page and context are always reset
  PW_CONTEXT = undefined
  PW_PAGE = undefined

  // Wrap the close method incase something happens
  // We still want to reset the browser reference
  try { PW_BROWSER && await PW_BROWSER.close() }
  catch(err){ Logger.error(err.message) }

  PW_BROWSER = undefined
}

/**
 * Ensures the browser is running, and starts it if it's not
 * Also ensure the context and page exist
 * @function
 * @public
 * @param {Object} browserConf - Config passed to the browser on launch (see startBrowser method)
 *
 * @returns {Object} - Contains the page, context, and browser created from playwright
 */
const ensureBrowser = async (browserConf=noOpObj) => {
  const { url } = browserConf

  !PW_PAGE
    ? await startBrowser(browserConf)
    : !PW_CONTEXT
      ? await newBrowserContext(browserConf)
      : !PW_PAGE
        ? await newBrowerPage(url)
        : url && await PW_PAGE.goto(url) 

  return {
    page: PW_PAGE,
    browser: PW_BROWSER,
    context: PW_CONTEXT,
  }
}

/**
 * Helper method to stop the currently running browser, and start a new one
 * @function
 * @public
 * @param {Object} browserConf - Config passed to the browser on launch (see startBrowser method)
 *
 * @returns {Object} - Contains the page, context, and browser created from playwright
 */
const restartBrowser = async browserConf => {
  await stopBrowser()
  return await startBrowser(browserConf)
}

/**
 * Starts browser using playwright
 * See {@link https://playwright.dev/docs/api/class-browsertype#browser-type-launch|Playwright Docs} for more info
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
const startBrowser = async (browserConf=noOpObj, isRecusion) => {
  const {
    args=noPropArr,
    type='chromium',
    active,
    url,
    ...config
  } = browserConf

  if(active === false) return noOpObj

  await newBrowser(type, args, config)
  await newBrowserContext(browserConf, isRecusion)
  await newBrowerPage(url)

  return {
    page: PW_PAGE,
    context: PW_CONTEXT,
    browser: PW_BROWSER,
  }
}

module.exports = {
  ensureBrowser,
  restartBrowser,
  startBrowser,
  stopBrowser
}