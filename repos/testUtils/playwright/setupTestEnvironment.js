const qawolf = require('qawolf')
const metadata = require('HerkinTasks/utils/playwright/metadata')
const { chromium, firefox, webkit } = require('playwright')
const { isStr, noOpObj, deepMerge } = require('@keg-hub/jsutils')

const {
  KEG_BROWSER_HEIGHT,
  KEG_BROWSER_WIDTH,
  HERKIN_BROWSER_HEIGHT,
  HERKIN_BROWSER_WIDTH,
} = process.env

// QAW_BROWSER is a qawolf-set env, dependent on parameters like --all-browsers or --firefox
// HOST_BROWSER is set by the task `keg herkin bdd run`
const BROWSER = process.env.QAW_BROWSER
  || process.env.HOST_BROWSER
  || 'chromium'

/**
 * Gets the browser type playwright object
 * @param {string} type - browser type (e.g. chromium)
 * @return {Object} browserType
 */
const getBrowser = (type) => {
  return ['firefox', 'ff'].includes(type)
    ? firefox
    : ['safari', 'webkit'].includes(type)
      ? webkit
      : chromium
}

const getInitSettings = options => {
  return deepMerge(options, {
    browser: {},
    context: {
      viewport: {
        // Check if the width and height are set by herkin, then keg, the set defaults
        width: HERKIN_BROWSER_WIDTH || KEG_BROWSER_WIDTH || 1280,
        height: HERKIN_BROWSER_HEIGHT || KEG_BROWSER_HEIGHT || 1024
      }
    },
  })
}

/**
 * Initializes tests by connecting to the browser loaded at the websocket
 * endpoint, creating a new browser context, and registering qawolf.
 * @param {Function} done - jest function called when all asynchronous ops are complete
 * @return {boolean} - true if init was successful
 */
const initialize = async (opts=noOpObj) => {
  try {
    const { endpoint, type } = metadata.read(BROWSER)
    const options = getInitSettings(opts)

    if (!isStr(endpoint) || !isStr(type))
      throw new Error(`Browser type "${BROWSER}" is not running (no entry in browser-meta.json)`)

    global.browser = await getBrowser(type).connect({
      ...options.browser,
      wsEndpoint: endpoint.replace('127.0.0.1', 'host.docker.internal')
    })
    global.context = await browser.newContext({
      ...options.context
    })

    await qawolf.register(context)
  }
  catch (err) {
    console.error(err.message)
    // exit 2 seconds later to ensure error 
    // has time to be written to stdout
    setTimeout(() => process.exit(1), 2000)
  }
  finally {
    return global.context && global.browser
  }
}

/**
 * Cleans up for testing tear down by releasing all resources, including
 * the browser window and any globals set in `initialize`.
 * @param {Function} done - jest function called when all asynchronous ops are complete
 * @return {boolean} - true if cleanup was successful
 */
const cleanup = async () => {
  if (!global.browser) return false
  await qawolf.stopVideos()
  await browser.close()
  delete global.browser
  delete global.context
  delete global.page
  return true
}

/**
 * Gets the browser page instance, or else creates a new one
 */
const getPage = async () => {
  if (!global.context)
    throw new Error('No browser context initialized')

  const pages = context.pages() || []

  return pages.length 
    ? pages[0]
    : await context.newPage()
}

/**
 */
const getBrowserContext = () => ({ getPage })

/**
 * Helper that calls the jest beforeAll and afterAll
 * functions for setup and teardown. Called in the qa-wolf template.
 */
const setupTestEnvironment = options => {
  beforeAll(() => initialize(options))
  afterAll(cleanup)
}

module.exports = {
  setupTestEnvironment,
  getBrowserContext,
  initialize,
  cleanup
}
