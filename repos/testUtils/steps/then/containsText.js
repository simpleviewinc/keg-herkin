const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const containsText = async (selector, data) => {
  const page = await getPage()
  const content = await page.$eval(selector, el => el.textContent)
  expect(content).toEqual(expect.stringContaining(data))
  return page
}

Then('the element {string} contains the text {string}', containsText)

module.exports = { containsText }

