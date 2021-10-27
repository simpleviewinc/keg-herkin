const { Then } = require('HerkinParkin')
const { exactText } = require('./exactText')
const { checkForAncestor } = require('HerkinSupport/validate')

/**
 * For the element matching `selector`, descendent of the registered ancestor, expects its text content to equal `data`
 * @param {string} selector - valid playwright selector
 * @param {string} data - text to compare to selector value/textContent
 * @param {Object} world 
 */
const descendentExactText = async (selector, data, world) => {
  checkForAncestor(world)
  return exactText(`${world.meta.ancestorSelector} ${selector}`, data)
}

Then('the descendent element {string} text is {string}', descendentExactText, {
  description: `Locates an element by selector and verifies element text matches exactly.
There must be a preceding step that establishes an ancestor.

Module : descendentExactText`,
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
  descendentExactText
}

