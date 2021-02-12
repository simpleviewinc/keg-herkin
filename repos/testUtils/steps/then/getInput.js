const { Then } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Then(/the input (\S+) should have the value (\S+)$/, async (selector, data) => {
  const page = await getPage()
  const inputSelector = `input${selector}`
  const content = await page.$eval(inputSelector, (el) => el.textContent)
  expect(content).toEqual(data)
})

