const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that the element is not on the DOM
 * @param {string} selector 
 */
const isDetached = async selector => {
  const page = await getPage()
  return page.waitForSelector(selector, { 
    state: 'detached',
    timeout: 100 //ms
  })
}

Then('the element {string} is detached', isDetached)

module.exports = { isDetached }