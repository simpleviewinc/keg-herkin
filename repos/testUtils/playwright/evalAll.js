const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const evalAll = async (selector, fn) => {
  const page = await getPage()
  const data = page.$$eval(selector, fn)

  if (!data)  
    throw new Error(`Evaluation returned null for selector "${selector}"`)

  return data
}

module.exports = { evalAll }