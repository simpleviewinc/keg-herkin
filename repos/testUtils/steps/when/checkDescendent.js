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

When(`I check the child/descendent {string}`, checkElement)

module.exports = {
  checkDescendent
}
