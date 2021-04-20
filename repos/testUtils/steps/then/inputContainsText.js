const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Expects the element matching `selector` to contain the text `data`
 * @param {string} selector 
 * @param {string} data 
 */
const inputContainsText = async (selector, data) => {
  const page = await getPage()
  const content = await page.$eval(selector, (el) => el.value)
  //expect(content).toEqual(expect.stringContaining(data))
  expect(content).toEqual(expect.stringContaining(data))
  return page
}

Then('the input {string} contains the text {string}', inputContainsText)

module.exports = { inputContainsText }

