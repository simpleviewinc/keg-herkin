const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that element, matching `selector`, has 
 * inner text content equal to `data`
 * @param {string} selector 
 * @param {string} data 
 */
const elementExactText = async (selector, data) => {
  const page = await getPage()
  const content = await page.$eval(selector, el => el.textContent)
  expect(content).toEqual(expect.stringMatching(data))
  return page
}

Then('the element {string} text is {string}', elementExactText, {
  description: 'Locates element by selector and verifies element text matches exactly.',
  expressions: [
    {
      type: 'string',
      description: 'The selector for the element.  Selector must be specific enough to locate only one element.',
      example: '#search',
    },
    {
      type: 'string',
      description: 'Text of the element to verify.',
      example: 'cucumber',
    }
  ]
})

module.exports = { elementExactText }
