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

// the following step assumes label as the default and therefore doesn't require it be specified
// since there is no 3rd argument the code is injecting the world object and where label should be
// commenting out because 
  // I don't want multiple steps in the steps list that do the same thing with minor differences - at least not until a keyword filter is added to the steps that will assist in locating the desired step.  I'm finding it difficult visually locate desired steps in the wall of grey text.
  // adding 'by "label"' isn't a big deal to me.
  // I like the consistency of specifying 'by "label"' or 'by "value"'.
//When('I set the select {string} to {string}', (selector,data,world) => {
  //return setSelectOption(selector,data,'label',world)
//})

//this step allows the user to change from label to value
When('I set the select {string} to {string} by {string}', setSelectOption, {
  description: 'Locates a select element by selector and selects specified options.  Can specify options by option label or option value.\n\nModule : setSelectOption',
  expressions: [
    {
      type: 'string',
      description: 'The selector for the select element.  Selector must be specific enough to locate a single element.',
      example: 'select[name=\'unique_name\']',
    },
    {
      type: 'string',
      description: 'Comma delimited list of option(s) to select.  Can be option labels or values.',
      example: 'California, Oregon, Washington',
    },
    {
      type: 'string',
      description: 'Valid options are \'label\' or \'value\' only.',
      example: 'value',
    }
  ]
})

module.exports = { setSelectOption }

