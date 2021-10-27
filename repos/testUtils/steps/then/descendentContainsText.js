const { Then } = require('HerkinParkin')
const { containsText } = require('./containsText')
const { checkForAncestor } = require('HerkinSupport/validate')


/**
 * For the element matching `selector`, descendent of the registered ancestor, expects its text content to equal `data`
 * @param {string} selector - valid playwright selector
 * @param {string} data - text to compare to descendent selector value/textContent
 * @param {Object} world 
 */
const descendentContainsText = async (selector, data, world) => {
  checkForAncestor(world)
  return containsText(`${world.meta.ancestorSelector} ${selector}`, data)
}

Then('the descendent element {string} contains the text {string}', descendentContainsText, {
  description: `Locates an element by selector and verifies element contains text.
There must be a preceding step that establishes an ancestor.

Module : descendentContainsText`,
  expressions: [
    {
      type: 'string',
      description: `The selector for the element.  Selector must be specific enough to locate a single element.`,
      example: '.ef-session-location',
    },
    {
      type: 'string',
      description: `The text of the element to verify.`,
      example: 'Main Hall',
    }
  ]
})

module.exports = {
  descendentContainsText
}

