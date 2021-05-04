const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Expects the number of dom elements matching `selector` to equal `count`
 * @param {string} selector 
 * @param {number} count 
 */
const elementCount = async (selector, count) => {
  const page = await getPage()
  const elements = await page.$$(selector)
  expect(elements.length).toEqual(count)
  return page
}

Then('the count of {string} is/equals {int}', elementCount, {
  description: 'Locates elements by selector and verifies count.\n\nModule : elementCount',
  expressions: [
    {
      type: 'string',
      description: 'The selector for the elements.',
      example: 'div.listing',
    },
    {
      type: 'int',
      description: 'Integer.  The count to verify.',
      example: '5',
    }
  ]
})

module.exports = { elementCount }
