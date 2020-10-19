const { Then } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Then("the input ${selector} should have the value {data}", async (selector, data) => {
  const page = await getPage()
  const inputSelector = `input${selector}`
  const content = await page.$eval(inputSelector, (el) => el.textContent)
  expect(content).toEqual(data)
})

