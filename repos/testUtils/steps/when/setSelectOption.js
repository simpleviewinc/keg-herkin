const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Expects the element matching `selector` and selects the option(s) with the label === `data`
 * @param {string} selector - valid playwright selector
 * @param {string} data - selector's option label or value
 */
const setSelectOption = async (selector, data, key='label') => {
  const page = await getPage()

  //defaults to use label if no 'by' key exists
  const options = data.split(",").map(value => ({ [key]: value }))
  const content = await page.selectOption(selector,options)
}

When('I set the select {string} to {string} by {string}', setSelectOption, {
  description: `Locates a select element by selector and selects specified options.  Can specify options by option label or option value.

Module : setSelectOption`,
  expressions: [
    {
      type: 'string',
      description: `The selector for the select element.  Selector must be specific enough to locate a single element.`,
      example: 'select[name=\'unique_name\']',
    },
    {
      type: 'string',
      description: `Comma delimited list of option(s) to select.  Can be option labels or values.`,
      example: 'California, Oregon, Washington',
    },
    {
      type: 'string',
      description: `Valid options are \'label\' or \'value\' only.`,
      example: 'value',
    }
  ]
})

module.exports = { setSelectOption }

