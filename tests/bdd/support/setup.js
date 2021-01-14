const qawolf = require("qawolf")
const { chromium, firefox, webkit  } = require('playwright')

const {
  KEG_BROWSER_WS,
  KEG_BROWSER_TYPE
} = process.env

const getBrowser = () => {
  return ['firefox', 'ff'].includes(KEG_BROWSER_TYPE)
    ? firefox
    : ['safari', 'webkit'].includes(KEG_BROWSER_TYPE)
      ? webkit
      : chromium
}

const initialize = async () => {
  global.browser = await getBrowser().connect({ wsEndpoint: KEG_BROWSER_WS })

  global.context = await browser.newContext()

  await qawolf.register(context)
}

const cleanup = async () => {
  await qawolf.stopVideos()
  await browser.close()
  delete global.browser
  delete global.context
  delete global.page
}

const setupTestEnvironment = () => {
  beforeAll(initialize)
  afterAll(cleanup)
}

const getPage = async (browser, context) => {
  return async () => {
    global.page = global.page || await context.newPage()
    return page
  }
}

const getBrowserContext = () => ({
  getPage: getPage(browser, context)
})

module.exports = {
  setupTestEnvironment,
  getBrowserContext,
}
