const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * @param {String} selector 
 * @return {ElementHandle?} - the Playwright.ElementHandle object found with `selector`, or null if it does not exist
 */
const getElement = async selector => {
  const page = await getPage()
  const element = await page.$(selector)
  if (!element)  
    throw new Error(`No element found with selector "${selector}"`)

  return element
}

module.exports = { getElement }