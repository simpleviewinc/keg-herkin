const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Expects the element matching `selector` and verifies selected options === `data`
 * @param {string} selector 
 * @param {string} data 
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
Then('the select {string} selected option(s) is/are {string}', (selector,data,world) => {
  return getSelectedOption(selector,data,'label',world)
})

Then('the select {string} selected option(s) is/are {string} by {word}', getSelectedOption)

module.exports = { getSelectedOption }
