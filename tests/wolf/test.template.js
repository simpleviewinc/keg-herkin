/**
 * TODO - Make a helper library for managing all this logic
 * Then add the helper methods to the template
 * The helper lib could be add as a require statement at the top
 * then the methods could be called in the beforeAll method
 * @example

  const helperLib = require('helperLib')

  beforeAll(async () => {
    // Would call all the logic below to initialize playwright to connect to the hosts browser instance
    helperLib.initPlaywright()

    // ---- This code would go in the helper lib ---- //
      const playwrightBrowser = getBrowser()

      browser = await playwrightBrowser.connect({
        wsEndpoint: \`ws://${BROWSER_HOST_URL}:${BROWSER_WS_PORT}/${BROWSER_WS_HASH}\`,
      })
    
      context = await browser.newContext()
      await qawolf.register(context)

    // ---- This code would go in the helper lib ---- //

  })

*/


const testTemplate = (options) => {
  const { name, url } = options
  return `const qawolf = require("qawolf")
const { chromium, firefox, webkit  } = require('playwright')

const { BROWSER } = process.env
const BROWSER_WS_PORT = process.env.BROWSER_WS_PORT || '64238'
const BROWSER_WS_HASH = process.env.BROWSER_WS_HASH || 'acdcce23a8c27e2ce365d88c0ebcd273'
const BROWSER_HOST_URL = process.env.BROWSER_HOST_URL || (DOC_APP_PATH ? 'host.docker.internal' : '127.0.0.1')

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
    wsEndpoint: \`ws://${BROWSER_HOST_URL}:${BROWSER_WS_PORT}/${BROWSER_WS_HASH}\`,
  })

  context = await browser.newContext()
  await qawolf.register(context)
})

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
})

test("${name}", async () => {
  await page.goto("${url}")
  await qawolf.create()
})`
}

module.exports =  {
  testTemplate
}