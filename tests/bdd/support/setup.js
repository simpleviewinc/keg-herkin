const qawolf = require("qawolf")
const { chromium, firefox, webkit  } = require('playwright')

const {
  BROWSER,
  DOC_APP_PATH,
  BROWSER_WS_HASH,
  BROWSER_WS_PORT='64238',
  BROWSER_HOST_URL=(DOC_APP_PATH ? `host.docker.internal` : `127.0.0.1`)
} = process.env

const getBrowser = () => {
  return ['firefox', 'ff'].includes(BROWSER)
    ? firefox
    : ['safari', 'webkit'].includes(BROWSER)
      ? webkit
      : chromium
}

const initialize = async () => {
  global.browser = await getBrowser().connect({
    wsEndpoint: `ws://${BROWSER_HOST_URL}:${BROWSER_WS_PORT}/${BROWSER_WS_HASH}`,
  })

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
