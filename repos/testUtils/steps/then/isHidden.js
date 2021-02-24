const { Then } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

const isHidden = async selector => {
  const element = getElement(selector) 
  expect(element).toBeDefined()
  expect(element.isHidden()).toBe(true)
}

Then('the element {string} is hidden', isHidden)

module.exports = { isHidden }