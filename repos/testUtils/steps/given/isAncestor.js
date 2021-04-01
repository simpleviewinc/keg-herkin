const { Given } = require('HerkinParkin')
const { getElements } = require('HerkinPlaywright')

/**
 * Finds the element matching `ancestorSelector`, and
 * registers it as the current ancestor
 * @param {string} ancestorSelector 
 * @param {Object} world 
 */
const isAncestor = async (parentContainer, ancestorSelector, world) => {
  const containerDescritor = parentContainer //this is a descriptor, in plain english, of the parent element such as session,listing, asset, etc.  currently not used anywhere and only included to make the step expression more readable
  const ancestor = getElements(ancestorSelector)

  world.meta = {
    ancestor,
    ancestorSelector,
  }

  return ancestor
}

//Given(`the element {string} is ancestor/parent`, isAncestor)
Given(`the {string} container element {string} is found`, isAncestor)

module.exports = { isAncestor }
