const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Click the element matching `selector`
 * @param {String} selector - playwright selector
 */
const clickElement = async selector => {
  const page = await getPage()
  return page.click(selector)
}

When('I click the element {string}', clickElement)

module.exports = {
  clickElement
}
