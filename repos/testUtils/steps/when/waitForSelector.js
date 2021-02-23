const { When } = require('HerkinParkin')
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

When('I wait for {string} to appear', async (selector) => {
  const page = await getPage()
  await page.waitForSelector(selector)
})
