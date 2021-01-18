const qawolf = require("qawolf")
const { chromium, firefox, webkit  } = require('playwright')
const metadata = require('../../../tasks/utils/playwright/metadata')
const { isStr, validate } = require('@keg-hub/jsutils')

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
 */
const initialize = async () => {
  const { endpoint, type } = metadata.read()

  const [ valid ] = validate({ endpoint, type }, { $default: isStr })
  if (!valid) return

  const wsEndpoint = endpoint.replace('127.0.0.1', 'host.docker.internal')

  global.browser = await getBrowser(type).connect({ wsEndpoint })
  global.context = await browser.newContext()

  await qawolf.register(context)
}

/**
 * Cleans up for testing tear down by releasing all resources, including
 * the browser window and any globals set in `initialize`.
 */
const cleanup = async () => {
  await qawolf.stopVideos()
  await browser.close()
  delete global.browser
  delete global.context
  delete global.page
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
