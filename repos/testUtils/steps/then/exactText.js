const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that element, matching `selector`, value (input & textarea elements) or textContent, is equal to `data`
 * @param {string} selector 
 * @param {string} data 
 */
const exactText = async (selector, data) => {
  const page = await getPage()
  
  //get element tagName
  const getElTagName = await page.$eval(selector, el => el.tagName)

  //if tagName is (input or textarea) use value else use textContent
  const content = (getElTagName === 'INPUT' || getElTagName === 'TEXTAREA') ? await page.$eval(selector, el => el.value) : await page.$eval(selector, el => el.textContent)
  
  //assert element text contains expected text
  expect(content).toEqual(data)
  return page
}

Then('the element {string} text is {string}', exactText, {
  description: 'Locates an element by selector and verifies element text matches exactly.\n\nModule : exactText',
  expressions: [
    {
      type: 'string',
      description: 'The selector for the element.  Selector must be specific enough to locate only one element.',
      example: '#search',
    },
    {
      type: 'string',
      description: 'The text of the element to verify.',
      example: 'cucumber',
    }
  ]
})

module.exports = { exactText }
