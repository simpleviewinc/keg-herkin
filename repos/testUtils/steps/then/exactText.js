const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that element, matching `selector`, has 
 * inner text content equal to `data`
 * @param {string} selector 
 * @param {string} data 
 */
const exactText = async (selector, data) => {
  const page = await getPage()
  //const content = await page.$eval(selector, el => el.textContent) //.textContent doesn't work for reading the text of an input
  const content = await page.$eval(selector, el => el.value)
  expect(content).toEqual(expect.stringMatching(data))
  return page
}

Then('the element {string} text is {string}', exactText)

module.exports = { exactText }

