const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Evaluates the element that matches selector
 * @param {string} selector 
 * @param {Function} fn - evaluation function
 */
const evalElement = async (selector, fn) => {
  const page = await getPage()
  const data = page.$eval(selector, fn)

  if (!data)  
    throw new Error(`Evaluation returned null for selector "${selector}"`)

  return data
}

module.exports = { evalElement }