const { Then } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Then(/the element (\S+) contains the text (\S+)$/, async (selector, data) => {
  const page = await getPage()
  const content = await page.$eval(selector, el => console.log({el}) || el.textContent)
  expect(content).toEqual(expect.stringContaining(data))
})

