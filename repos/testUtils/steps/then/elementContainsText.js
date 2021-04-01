const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that element, matching `selector`, has 
 * inner text content equal to `data`
 * @param {string} selector 
 * @param {string} data 
 */
const elementContainsText = async (selector, data) => {
  const page = await getPage()
  const content = await page.$eval(selector, el => el.textContent)
  expect(content).toEqual(expect.stringContaining(data))
  return page
}

Then('the element {string} contains the text {string}', elementContainsText)

module.exports = { elementContainsText }
