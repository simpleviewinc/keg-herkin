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

Then('the element {string} contains the text {string}', elementContainsText, {
  description: 'Locates an element by selector and verifies element text contains string.\n\nModule : elementContainsText',
  expressions: [
    {
      type: 'string',
      description: 'The selector for the element.  Selector must be specific enough to locate a single element.',
      example: 'div.weather-container >> div.temp',
    },
    {
      type: 'string',
      description: 'The text of the element to verify.',
      example: '85°',
    }
  ]
})

module.exports = { elementContainsText }
