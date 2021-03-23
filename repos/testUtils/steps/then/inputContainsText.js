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
  const inputSelector = `input${selector}`
  const content = await page.$eval(inputSelector, (el) => el.textContent)

  expect(content).toEqual(data)
  return page
}

Then('the input {string} contains the text {string}', inputContainsText)

module.exports = { inputContainsText }

