const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that element, matching `selector`, value (input & textarea elements) or textContent, contains `data`
 * @param {string} selector 
 * @param {string} data 
 */
const containsText = async (selector, data) => {
  const page = await getPage()
  
  //get element tagName
  const getElTagName = await page.$eval(selector, el => el.tagName)

  //if tagName is (input or textarea) use value else use textContent
  const content = (getElTagName === 'INPUT' || getElTagName === 'TEXTAREA') ? await page.$eval(selector, el => el.value) : await page.$eval(selector, el => el.textContent)
  
  //assert element text contains expected text
  expect(content).toEqual(expect.stringContaining(data))
  return page
}

Then('the element {string} contains the text {string}', containsText, {
  description: 'Locates an element by selector and verifies element contains text.\n\nModule : containsText',
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

module.exports = { containsText }
