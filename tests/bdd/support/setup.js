const qawolf = require("qawolf")
const { chromium, firefox, webkit  } = require('playwright')
const metadata = require('../../../tasks/utils/playwright/metadata')
const { isStr } = require('@keg-hub/jsutils')

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
 * Initializes tests by connecting to the browser loaced at the websocket
 * endpoint, creating a new browser context, and registering qawolf.
 * @param {Function} done - jest function called when all asynchronous ops are complete
 */
const initialize = async done => {
  try {
    const { endpoint, type } = metadata.read()
    if (!isStr(endpoint) || !isStr(type))
      throw new Error('Could not read the websocket and browser type from browser-meta.json')

    const wsEndpoint = endpoint.replace('127.0.0.1', 'host.docker.internal')

    global.browser = await getBrowser(type).connect({ wsEndpoint })
    global.context = await browser.newContext()

    await qawolf.register(context)
  }
  catch (err) {
    console.error(err.message)
  }
  finally {
    global.context && global.browser && done()
  }
}

/**
 * Cleans up for testing tear down by releasing all resources, including
 * the browser window and any globals set in `initialize`.
 * @param {Function} done - jest function called when all asynchronous ops are complete
 */
const cleanup = async done => {
  if (!global.browser) return done()
  await qawolf.stopVideos()
  await browser.close()
  delete global.browser
  delete global.context
  delete global.page
  done()
}

/**
 * Helper that calls the jest beforeAll and afterAll
 * functions for setup and teardown. Called in the qa-wolf template.
 */
const setupTestEnvironment = () => {
  beforeAll(initialize)
  afterAll(cleanup)
}

/**
 * Gets the browser page instance, or else creates a new one
 */
const getPage = async () => {
  global.page = global.page || await context.newPage()
  return page
}

/**
 */
const getBrowserContext = () => ({ getPage })

module.exports = {
  setupTestEnvironment,
  getBrowserContext,
}
