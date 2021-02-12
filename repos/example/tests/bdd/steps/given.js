const { Given } = require('cucumber')
const { getBrowserContext } = require('@repos/testUtils/support/setup')
const { getPage } = getBrowserContext()

Given('I navigate to {word}', async site => {
  const page = await getPage()
  await page.goto(site)
})
