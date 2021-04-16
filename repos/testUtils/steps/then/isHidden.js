const { Then } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

/**
 * Checks that the element is on the DOM, but is hidden
 * @param {string} selector 
 */
const isHidden = async selector => {
  const element = getElement(selector) 
  expect(element).toBeDefined()
  expect(element.isHidden()).toBe(true)
}

Then('the element {string} is hidden', isHidden, {
  description: 'Checks that the element is on the DOM, but is hidden',
  expressions: [
    {
      type: 'string',
      example: `#element-id`,
      description: 'Playwright element selector ( css | text | xpath )',
    }
  ]
})

module.exports = { isHidden }