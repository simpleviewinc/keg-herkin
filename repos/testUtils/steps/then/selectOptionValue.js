const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Expects the element matching `selector` and selects the option with value === `data`
 * @param {string} selector 
 * @param {string} data 
 */
const selectOptionValue = async (selector, data) => {
  const page = await getPage()
  console.log(selector)
  //const selectSelector = `select${selector}`
  const content = await page.selectOption(selector, { label: `${data}` });

}

Then('the select {string} selected option is {string}', selectOptionValue)

module.exports = { selectOptionValue }

