const qawolf = require('qawolf')
const metadata = require('../playwright/metadata')
const { chromium, firefox, webkit  } = require('playwright')
const { isStr } = require('@keg-hub/jsutils')

// QAW_BROWSER is a qawolf-set env, dependent on parameters like
// --all-browsers or --firefox
const BROWSER = process.env.QAW_BROWSER || 'chromium'

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
 * endpoint, creating a new browser context, and registering qawolf.
 * @param {Function} done - jest function called when all asynchronous ops are complete
 */
const initialize = async done => {
  try {
    const { endpoint, type } = metadata.read(BROWSER)
    if (!isStr(endpoint) || !isStr(type))
      throw new Error(`Browser type "${BROWSER}" is not running (no entry in browser-meta.json)`)

    const wsEndpoint = endpoint.replace('127.0.0.1', 'host.docker.internal')

    global.browser = await getBrowser(type).connect({ wsEndpoint })
    global.context = await browser.newContext()

    await qawolf.register(context)
  }
  catch (err) {
    console.error(err.message)
    // exit 2 seconds later to ensure error 
    // has time to be written to stdout
    setTimeout(() => process.exit(1), 2000)
  }
  finally {
    global.context && global.browser && done && done()
    return { 
      context,
      browser
    }
  }
}

/**
 * Cleans up for testing tear down by releasing all resources, including
 * the browser window and any globals set in `initialize`.
 * @param {Function} done - jest function called when all asynchronous ops are complete
 */
const cleanup = async done => {
  if (!global.browser) return done && done()
  await qawolf.stopVideos()
  await browser.close()
  delete global.browser
  delete global.context
  delete global.page
  done && done()
}

/**
 * Gets the browser page instance, or else creates a new one
 */
const getPage = async () => {
  global.page = global.page || await context.newPage()
  return global.page
}

/**
 */
const getBrowserContext = () => ({ getPage })

/**
 * Helper that calls the jest beforeAll and afterAll
 * functions for setup and teardown. Called in the qa-wolf template.
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
