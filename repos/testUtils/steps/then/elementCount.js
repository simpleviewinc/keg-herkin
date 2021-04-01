const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Expects the number of dom elements matching `selector` to equal `count`
 * @param {string} selector 
 * @param {number} count 
 */
const elementCount = async (selector, count) => {
  const page = await getPage()
  const elements = await page.$$(selector)
  expect(elements.length).toEqual(count)
  return page
}

Then('the count of {string} is/equals {int}', elementCount)

module.exports = { elementCount }
