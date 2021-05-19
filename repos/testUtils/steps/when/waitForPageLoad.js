const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Returns when the required load state has been reached.
 * Without specifying any arguments, it by default waits for the load event to fire.
 * Read more here: https://playwright.dev/docs/api/class-page#pagewaitforloadstatestate-options
 */
const waitForPageLoad = async () => {
  const page = await getPage()
  await page.waitForLoadState()
  return page
}

When('I wait for the page to load', waitForPageLoad, {
  description: 'Waits for load event to fire.\nPreceding step should be something that causes a page load such as a refresh, submitting a form, clicking a link, etc.\nIf the page load event has already fired before reaching this step the step resolves immediately.\n\nModule : waitForPageLoad'
})

module.exports = { waitForPageLoad }
