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

When('I click the descendent element {string}', clickDescendent)

module.exports = { clickDescendent }
