const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Sets the input text of selector to data
 * @param {string} data 
 * @param {string} selector 
 */
const setInputText = async (data, selector) => {
  const page = await getPage()
  const inputSelector = `input${selector}`
  await page.click(inputSelector)
  await page.type(inputSelector, data)
  return page
}

When('I set {string} to the input {string}', setInputText)

module.exports = { setInputText }

