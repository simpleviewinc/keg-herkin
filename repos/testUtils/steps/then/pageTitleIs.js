const { Then } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Then('the title is (\S+) ', async (title) => {
  const page = await getPage()
  expect(await page.title()).toBe(title)
})