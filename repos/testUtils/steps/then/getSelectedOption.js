const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Expects the element matching `selector` and verifies selected options === `data`
 * @param {string} selector - valid playwright selector
 * @param {string} data - selector's option label or value
 */
const getSelectedOption = async (selector, data, key) => {
  const page = await getPage()

  const selectedLabels = await page.$eval(selector, (el, key) => {
    const options = Array.from(el.selectedOptions)
    return options.map(option => {
      return option[key]
    })
  }, key)
  
  data.split(",").map(label => {
    expect(selectedLabels.includes(label)).toBe(true)
  })
}

//this step calls the function this way, as opposed to the step below, because there is no 3rd argument so it's injecting world object and where label should be
// Then('the select {string} selected option(s) is/are {string}', (selector,data,world) => {
//   return getSelectedOption(selector,data,'label',world)
// })

Then('the select {string} selected option(s) is/are {string} by {string}', getSelectedOption, {
  description: `Locates a select element by selector and verifies its selected options.  Can verify options by option label or option value.
  
Module : getSelectedOption`,
  expressions: [
    {
      type: 'string',
      description: `The selector for the select element.  Selector must be specific enough to locate a single element.`,
      example: 'select[name=\'unique_name\']',
    },
    {
      type: 'string',
      description: `Comma delimited list of expected selected option(s).  Can be option labels or values.`,
      example: 'California, Oregon, Washington',
    },
    {
      type: 'string',
      description: `Valid options are \'label\' or \'value\' only.`,
      example: 'value',
    }
  ]
})

module.exports = { getSelectedOption }
