const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that element, matching `selector`, has inner text content equal to `data`
 * @param {string} selector 
 * @param {string} data 
 */
const inputExactText = async (selector, data) => {
  const page = await getPage()
  //const inputSelector = `input${selector}`
  const content = await page.$eval(selector, el => el.value)
  expect(content).toEqual(data)
  return page
}

Then('the input {string} text is {string}', inputExactText, {
  description: 'Locates input element by selector and verifies element text matches exactly.',
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

module.exports = { inputExactText }
