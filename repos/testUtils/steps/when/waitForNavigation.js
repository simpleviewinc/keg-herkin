const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Waits for the page to finish loading.
 * Read more here: https://playwright.dev/docs/api/class-page?_highlight=waitfornav#pagewaitfornavigationoptions
 */
const waitForNavigation = async () => {
  const page = await getPage()
  await page.waitForNavigation()
  return page
}

When('I wait for the page to load', waitForNavigation)

module.exports = { waitForNavigation }
