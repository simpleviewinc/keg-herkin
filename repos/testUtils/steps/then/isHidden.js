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

Then('the element {string} is hidden', isHidden)

module.exports = { isHidden }