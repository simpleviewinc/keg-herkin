const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Waits for the page to finish loading.
 * Must be called before the step that results in navigation such as clicking on a link.
 * Read more here: https://playwright.dev/docs/api/class-page?_highlight=waitfornav#pagewaitfornavigationoptions
 * Currently causes errors when included in features.  There is a ticket to investigate.
 */
const waitForNavigation = async () => {
  const page = await getPage()
  await page.waitForNavigation()
  // await page.waitForNavigation({
  //   timeout: 4000,
  //   waitUntil: 'networkidle',
  // })
  return page
}

//When('I wait for navigation to complete/resolve', waitForNavigation)

module.exports = { waitForNavigation }
