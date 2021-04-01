const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Sets the input text of selector to data
 * @param {string} selector
 * @param {string} data 
 */
const setText = async (selector,data) => {
  const page = await getPage()
  await page.click(selector)
  await page.type(selector, data)
  return page
}

When('I set the element {string} text to {string}', setText)

module.exports = { setText }

