const { Then } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Then(/the element (.*) contains the text (.*)$/, async (selector, data) => {
  const page = await getPage()
  const content = await page.$eval(selector, el => el.textContent)
  expect(content).toEqual(expect.stringContaining(data))
})

