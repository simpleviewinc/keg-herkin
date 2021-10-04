const playwright = require('playwright')
const { noOpObj, noPropArr } = require('@keg-hub/jsutils')

/**
 * Starts browser using playwright
 * @param {Object} browserConf
 * @param {Array} browserConf.args - Arguments to pass to the browser on launch
 * @param {string} browserConf.type - Name of the browser to launch
 * @param {boolean} browserConf.active - Should the browser be started, must explicitly be set to false
 * @param {string} [browserConf.url=https://google.com] - Initial url the browser should navigate to
 * @param {Object} browserConf.config - Options to pass to the browser on launch
 * @param {Object} currentBrowser - Existing running browser
 *
 * @returns {Object} - Contains the page, context, and browser created from playwright
 */
const startBrowser = async (browserConf, currentBrowser) => {
  if(currentBrowser) return currentBrowser

  const {
    args=noPropArr,
    type,
    active,
    url,
    ...config
  } = browserConf

  if(active === false) return noOpObj

  Logger.log(`- Starting playwright browser ${type || 'chromium'}...`)
  const browser = await (playwright[type] || playwright.chromium).launch({
      headless: false,
      slowMo: 50,
      devtools: true,
      channel: type || `chrome`,
      ...config,
      args: [
        `--disable-gpu`,
        `--disable-dev-shm-usage`,
        `--no-sandbox`,
        `--window-position=0,0`,
        ...args
      ]
    })

  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(url || `https://google.com`)

  return {
    page,
    context,
    browser,
  }

}

module.exports = {
  startBrowser
}