const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that element, matching `selector`, has 
 * inner text content equal to `data`
 * @param {string} selector 
 * @param {string} data 
 */
const inputExactText = async (selector, data) => {
  const page = await getPage()
  //const inputSelector = `input${selector}`
  const content = await page.$eval(selector, el => el.value)
  expect(content).toEqual(expect.stringMatching(data))
  return page
}

Then('the input {string} text is {string}', inputExactText)

module.exports = { inputExactText }
