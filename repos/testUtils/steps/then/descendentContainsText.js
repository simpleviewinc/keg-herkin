const { Then } = require('HerkinParkin')
const { evalElement } = require('HerkinPlaywright')
const { isObj } = require('@keg-hub/jsutils')

/**
 * Validates that the world object has a registered ancestor
 * @param {Object} world 
 */
const validateWorld = world => {
  if (!isObj(world.meta) || !isObj(world.meta.ancestor))
    throw new Error('Use an ancestor-registration step before running this step')
}

/**
 * For the element matching `selector`, descendent of the registered ancestor,
 * expects its text content to equal `data`
 * @param {string} selector 
 * @param {string} data 
 * @param {Object} world 
 */
const descendentContainsText = async (selector, data, world) => {
  validateWorld(world)
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
  validateWorld(world)
  const content = await world.meta.ancestor.$eval(selector, elem => elem.textContent)
  expect(content).toEqual(expect.stringContaining(data))
}

Then('the descendent {string} contains the text {string}', descendentContainsText)
Then('the child {string} contains the text {string}', childContainsText)

module.exports = {
  childContainsText,
  descendentContainsText
}

