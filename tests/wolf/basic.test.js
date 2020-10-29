const qawolf = require("qawolf")
const { chromium, firefox, webkit  } = require('playwright')
const { Given  } = require('cucumber')

const { BROWSER } = process.env
const BROWSER_WS_PORT = process.env.BROWSER_WS_PORT || '64238'
const BROWSER_WS_HASH = process.env.BROWSER_WS_HASH || 'acdcce23a8c27e2ce365d88c0ebcd273'
const BROWSER_HOST_URL = process.env.BROWSER_HOST_URL || (DOC_APP_PATH ? `host.docker.internal` : `127.0.0.1`)

let browser
let context

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
  await qawolf.stopVideos();
  await browser.close();
})

// Should run test for jest && Given for cucumber
test("basic", async () => {
  await page.goto("${url}")
  await qawolf.create()
})

Given("I open the site {site}", async site => {
  const page = await getPage()
  await page.goto(site)
  await qawolf.create()
})