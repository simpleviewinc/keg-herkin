const { When } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

When(/I wait for the page to load/, async () => {
  const page = await getPage()
  await page.waitForNavigation()
})
