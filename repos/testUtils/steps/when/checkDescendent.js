const { When } = require('HerkinParkin')
const { checkElement } = require('./checkElement')
const { checkForAncestor } = require('HerkinSupport/validate')

/**
 * Attempts to check (a checkbox) matching `selector`, that is also
 * a descendent of the registered ancestor.
 * @param {string} selector 
 * @param {Object} world 
 */
const checkDescendent = async (selector, world) => {
  checkForAncestor(world)
  return checkElement(`${world.meta.ancestorSelector} ${selector}`)
}

When(`I check the descendent element {string}`, checkElement, {
  description: 'Locates a checkbox element by selector and checks the checkbox.\nThere must be a preceding step that establishes an ancestor.',
  expressions: [
    {
      type: 'string',
      description: 'The selector for the checkbox element.  Selector must be specific enough to locate a single element.',
      example: 'input[name=\'unique_name\']',
    }
  ]
})

module.exports = {
  checkDescendent
}
