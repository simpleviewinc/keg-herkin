const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Sets the input text of selector to data
 * @param {string} selector
 * @param {string} data 
 */
const setInputText = async (selector,data) => {
  const page = await getPage()
  const inputSelector = `input${selector}`
  await page.click(inputSelector)
  await page.type(inputSelector, data)
  return page
}

When('I set the input element {string} to {string}', setInputText)

module.exports = { setInputText }

