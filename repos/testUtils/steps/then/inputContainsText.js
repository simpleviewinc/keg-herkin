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

Then('the input {string} contains the text {string}', inputContainsText, {
  description: 'Locates input element by selector and verifies element text.',
  expressions: [
    {
      type: 'string',
      description: 'The selector for the input element.  Selector must be specific enough to locate only one element.',
      example: '#search',
    },
    {
      type: 'string',
      description: 'Text of the element to verify.',
      example: 'cucumber',
    }
  ]
})

module.exports = { inputContainsText }

