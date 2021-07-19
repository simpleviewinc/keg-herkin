const { When } = require('HerkinParkin')
const { checkElement } = require('./checkElement')
const { checkForAncestor } = require('HerkinSupport/validate')

/**
 * Checks/unchecks the element matching the selector, that is also
 * a descendent of the registered ancestor.
 * @param {String} action - check action
 * @param {string} selector 
 * @param {Object} world 
 */
const checkDescendent = async (action, selector, world) => {
  checkForAncestor(world)
  return checkElement(action, `${world.meta.ancestorSelector} ${selector}`)
}

When(`I {string} the descendent element {string}`, checkDescendent, {
  description: 'Locates a checkbox element by selector and checks the checkbox.\nThere must be a preceding step that establishes an ancestor.\n\nModule : checkDescendent',
  expressions: [
    {
      type: 'string',
      description: 'Valid options are \'check\' or \'uncheck\' only.',
      example: 'check',
    },
    {
      type: 'string',
      description: 'The element selector.  Selector must be specific enough to locate a single element.  Valid for checkbox and radio inputs.\n\nExample : I "uncheck" the element "input[name=\'unique_name\']"',
      example: 'input[name=\'unique_name\']',
    },
  ]
})

module.exports = {
  checkDescendent
}
