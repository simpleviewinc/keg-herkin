const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Expects the element matching `selector` and selects the option with the label === `data`
 * @param {string} selector 
 * @param {string} data 
 */
const setSelectOption = async (selector, data) => {
  const page = await getPage()
  const content = await page.selectOption(selector, { label: `${data}` });
}

When('I set the select {string} to {string}', setSelectOption)

module.exports = { setSelectOption }

