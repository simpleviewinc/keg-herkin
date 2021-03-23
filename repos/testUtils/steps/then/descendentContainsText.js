const { Then } = require('HerkinParkin')
const { evalElement } = require('HerkinPlaywright')
const { checkForAncestor } = require('HerkinSupport/validate')

/**
 * For the element matching `selector`, descendent of the registered ancestor,
 * expects its text content to equal `data`
 * @param {string} selector 
 * @param {string} data 
 * @param {Object} world 
 */
const descendentContainsText = async (selector, data, world) => {
  checkForAncestor(world)
  const content = await evalElement(`${world.meta.ancestorSelector} ${selector}`, elem => elem.textContent)
  expect(content).toEqual(expect.stringContaining(data))
}

/**
 * For the element matching `selector`, child of the registered ancestor,
 * expects its text content to equal `data`
 * @param {string} selector 
 * @param {string} data 
 * @param {Object} world 
 */
const childContainsText = async (selector, data, world) => {
  checkForAncestor(world)
  const content = await world.meta.ancestor.$eval(selector, elem => elem.textContent)
  expect(content).toEqual(expect.stringContaining(data))
}

Then('the descendent element {string} contains the text {string}', descendentContainsText)
Then('the child element {string} contains the text {string}', childContainsText)

module.exports = {
  childContainsText,
  descendentContainsText
}

