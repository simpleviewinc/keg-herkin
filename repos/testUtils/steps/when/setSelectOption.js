const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Expects the element matching `selector` and selects the option with value === `data`
 * @param {string} selector 
 * @param {string} data 
 */
const setSelectOption = async (selector, data) => {
  const page = await getPage()
  const content = await page.selectOption(selector, { label: `${data}` });
}

Then('the select {string} selected option is {string}', setSelectOption)

module.exports = { setSelectOption }

