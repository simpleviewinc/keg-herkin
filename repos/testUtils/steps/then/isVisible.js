const { Then } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

const isVisible = async selector => {
  const element = await getElement(selector) 
  expect(element).toBeDefined()
  expect(await element.isVisible()).toBe(true)
}

Then('the element {string} is visible', isVisible)

module.exports = { isVisible }