const { Then } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Then("the element {selector} contains the text {data}", async (selector, data) => {
  const page = await getPage()
  const inputSelector = `input${selector}`
  const content = await page.$eval(inputSelector, (el) => el.textContent)
  expect(content).toEqual(data)
})

