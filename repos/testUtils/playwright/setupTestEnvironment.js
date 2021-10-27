const metadata = require('HerkinTasks/utils/playwright/metadata')
const { chromium, firefox, webkit } = require('playwright')
const { isStr } = require('@keg-hub/jsutils')

// HOST_BROWSER is set by the task `keg herkin bdd run`
const BROWSER = process.env.HOST_BROWSER
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

/**
 * Initializes tests by connecting to the browser loaded at the websocket
 * endpoint, creating a new browser context.
 * @param {Function} done - jest function called when all asynchronous ops are complete
 * @return {boolean} - true if init was successful
 */
const initialize = async () => {
  try {
    const { endpoint, type } = metadata.read(BROWSER)
    if (!isStr(endpoint) || !isStr(type))
      throw new Error(`Browser type "${BROWSER}" is not running (no entry in browser-meta.json)`)
    
    const wsEndpoint = endpoint.replace('127.0.0.1', 'host.docker.internal')

    global.browser = await getBrowser(type).connect({ wsEndpoint })
    global.context = await browser.newContext()
    // TODO: Update to use playwright video record start
    // TODO: investigate to see if we other changes for the context 
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
  // TODO: Update to use playwright video record end
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
 * functions for setup and teardown. Called in the waypoint templates template.
 */
const setupTestEnvironment = () => {
  beforeAll(initialize)
  afterAll(cleanup)
}

module.exports = {
  setupTestEnvironment,
  getBrowserContext,
  initialize,
  cleanup
}
