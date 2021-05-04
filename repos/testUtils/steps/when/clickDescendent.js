const { When } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')
const { checkForAncestor } = require('HerkinSupport/validate')

/**
 * Clicks the element `selector` that is a descendant of the registered ancestor.
 * @param {String} selector 
 * @param {Object} world - world object, containing the ancestor metadata
 */
const clickDescendent = async (selector, world) => {
  checkForAncestor(world)
  const descendent = await getElement(`${world.meta.ancestorSelector} ${selector}`)
  if (!descendent)
    throw new Error(`Found no descendent of "${world.meta.ancestorSelector}", with selector: "${selector}"`)

  return descendent.click()
}

When('I click the descendent element {string}', clickDescendent, {
  description: 'Locates a element by selector and clicks.\nThere must be a preceding step that establishes an ancestor.\n\nModule : clickDescendent',
  expressions: [
    {
      type: 'string',
      description: 'The selector for the element.  Selector must be specific enough to locate a single element.',
      example: 'button[name=\'unique_name\']',
    }
  ]
})

module.exports = { clickDescendent }
