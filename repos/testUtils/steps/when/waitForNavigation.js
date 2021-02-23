const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const waitForNavigation = async () => {
  const page = await getPage()
  await page.waitForNavigation()
  return page
}

When('I wait for the page to load', waitForNavigation)

module.exports = { waitForNavigation }
