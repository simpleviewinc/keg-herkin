const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that element has attribute value
 * @param {string} selector 
 * @param {string} attribute 
 * @param {string} value
 */
const getAttribute = async (selector, attribute, value) => {
  const page = await getPage()
  //get attribute value
  let attVal = await page.getAttribute(selector, attribute).then(val => {return val})
  console.log('attribute : ' + attVal + '; type of : ' + typeof attVal)

  //on load pagination back arrow has disabled attribute, this is disabled = true
  //returns type of string
  //value of string is empty (not null)
  if (typeof attVal === "string" && attVal.length === 0) {attVal = "true"}

  //on load pagination forward arrow does not have the disabled attribute, this is disabled = false
  //returns type of object
  //value of object is null (this is because 'disabled' attribute doesn't have a value assigned - if attribute had value assigned the value would be returned)
  if (typeof attVal === "object" && attVal === null) {attVal = "false"}
  expect(attVal).toEqual(value)
  //return page
}

Then('the element {string} attribute {string} is {string}', getAttribute, {
  description: 'Locates elements by selector and verifies attribute value.\n\nModule : getAttribute',
  expressions: [
    {
      type: 'string',
      description: 'The selector for the element.'
    },
    {
      type: 'string',
      description: 'The attribute value for the element.'
    },
    {
      type: 'string',
      description: 'The expected attribute value.'
    }
  ]
})

module.exports = { getAttribute }
