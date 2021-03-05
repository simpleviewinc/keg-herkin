const { Given } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

/**
 * Finds the element matching `ancestorSelector`, and
 * registers it as the current ancestor
 * @param {string} ancestorSelector 
 * @param {Object} world 
 */
const isAncestor = async (ancestorSelector, world) => {
  const ancestor = getElement(ancestorSelector)

  world.meta = {
    ancestor,
    ancestorSelector,
  }

  return ancestor
}

Given(`the element {string} is ancestor/parent`, isAncestor)

module.exports = { isAncestor }
