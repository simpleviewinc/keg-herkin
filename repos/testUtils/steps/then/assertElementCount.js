const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const assertElementCount = async (selector, count) => {
  const page = await getPage()
  const elements = await page.$$(selector)
  expect(elements.length).toEqual(count)
  return page
}

Then('the count of element {string} is {int}', assertElementCount)

module.exports = { assertElementCount }
