const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Expects the element matching `selector` and selects the option(s) with the label === `data`
 * @param {string} selector 
 * @param {string} data 
 */

const setSelectOption = async (selector, data, key='label') => {
  const page = await getPage()

  //defaults to use label if no 'by' key exists
  const options = data.split(",").map(value => ({ [key]: value }))
  const content = await page.selectOption(selector,options)

}

//this step calls the function this way, as opposed to the step below, because there is no 2nd argument so it's injecting world object and where label should be
When('I set the select {string} to {string}', (selector,data,world) => {
  return setSelectOption(selector,data,'label',world)
})
//this step allows the user to change from label to value
When('I set the select {string} to {string} by {word}', setSelectOption)

module.exports = { setSelectOption }

