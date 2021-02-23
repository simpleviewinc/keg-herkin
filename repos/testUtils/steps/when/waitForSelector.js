const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const waitForSelector = async (selector) => {
  const page = await getPage()
  await page.waitForSelector(selector)
  return page
}

When('I wait for {string} to appear', waitForSelector)

module.exports = { waitForSelector }