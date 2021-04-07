const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Returns when the required load state has been reached.
 * Without specifying any arguments, it by default waits for the load event to fire.
 * Read more here: https://playwright.dev/docs/api/class-page#pagewaitforloadstatestate-options
 */
const waitForLoadState = async () => {
  const page = await getPage()
  await page.waitForLoadState()
  return page
}

When('I wait for the page to load', waitForLoadState)

module.exports = { waitForLoadState }
