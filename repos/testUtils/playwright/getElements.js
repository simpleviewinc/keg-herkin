const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * @param {String} selector 
 * @return {Array<ElementHandle>} - array of Playwright.ElementHandle objects found with `selector`. May be empty.
 */
const getElements = async selector => {
  const page = await getPage()
  return page.$$(selector)
}

module.exports = { getElements }