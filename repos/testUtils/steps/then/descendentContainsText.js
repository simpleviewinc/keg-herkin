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

/* 
NNQA Note : As a test writer, I'm not sure I care if an element is a descendent or a direct child

What I care about primarily is that elements can be found in relation to another element, for example : 
x5 : session > booking button
zerisa : attendee > picture
web : listing > yelp review

Commenting out the child step expression/definition to see if it comes up but want to keep in code for now in case it does

*/

/**
 * For the element matching `selector`, child of the registered ancestor,
 * expects its text content to equal `data`
 * @param {string} selector 
 * @param {string} data 
 * @param {Object} world 
 */
// const childContainsText = async (selector, data, world) => {
//   checkForAncestor(world)
//   const content = await world.meta.ancestor.$eval(selector, elem => elem.textContent)
//   expect(content).toEqual(expect.stringContaining(data))
// }

Then('the descendent element {string} contains the text {string}', descendentContainsText)
//Then('the child element {string} contains the text {string}', childContainsText)

module.exports = {
  //childContainsText,
  descendentContainsText
}

