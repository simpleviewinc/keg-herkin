const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()
const { get } = require('@keg-hub/jsutils')

/**
 * Sets the input text of selector to data
 * @param {string} selector
 * @param {string} data 
 * @param {Object} world 
 */
const setText = async (selector,data, world) => {
  const page = await getPage()
  await page.click(selector)
  //clear value before setting otherwise data is appended to end of existing value
  await page.fill(selector, '')

  const [ _, ...worldVar ] = data.split('.')
  const parsed = get(world, worldVar)
  //console.log(parsed)
  const rtnData = (!data.startsWith(`$world`) ? data : parsed)
  
  await page.type(selector, rtnData)
  return page
}

When('I set the element {string} text to {string}', setText)

module.exports = { setText }

