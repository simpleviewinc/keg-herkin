const { Then } = require('HerkinParkin')
const { evalElement } = require('HerkinPlaywright')
const { isObj } = require('@keg-hub/jsutils')

const validateWorld = world => {
  if (!isObj(world.meta) || !isObj(world.meta.ancestor))
    throw new Error('Use an ancestor-registration step before running this step')
}

const descendentContainsText = async (selector, data, world) => {
  validateWorld(world)
  const content = await evalElement(`${world.meta.ancestorSelector} ${selector}`, elem => elem.textContent)
  expect(content).toEqual(expect.stringContaining(data))
}

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

