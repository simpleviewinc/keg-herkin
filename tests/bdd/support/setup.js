const qawolf = require("qawolf")
const { chromium, firefox, webkit  } = require('playwright')
const { BROWSER } = process.env
const BROWSER_WS_PORT = process.env.BROWSER_WS_PORT || '64238'
const BROWSER_WS_HASH = process.env.BROWSER_WS_HASH
const BROWSER_HOST_URL = process.env.BROWSER_HOST_URL || (DOC_APP_PATH ? `host.docker.internal` : `127.0.0.1`)

let browser
let context
let page

const getBrowser = () => {
  return BROWSER === 'firefox' || BROWSER === 'ff'
    ? firefox
    : BROWSER === 'safari' || BROWSER === 'webkit'
      ? webkit
      : chromium
}

beforeAll(async () => {
  const playwrightBrowser = getBrowser()
  
  browser = await playwrightBrowser.connect({
    wsEndpoint: `ws://${BROWSER_HOST_URL}:${BROWSER_WS_PORT}/${BROWSER_WS_HASH}`,
  })

  context = await browser.newContext()
  await qawolf.register(context)
})

afterAll(async () => {
  await qawolf.stopVideos()
  await browser.close()
  page = null
})

const getBrowserContext = () => ({
  getPage: getPage(browser, context)
})

const getPage = async (browser, context) => {
  return () => {
    page = page || await context.newPage()
    return page
  }
}

module.exports = {
  getBrowserContext,
}
