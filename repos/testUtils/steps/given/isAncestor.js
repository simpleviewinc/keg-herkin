const { Given } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

/**
 * Finds the element matching `ancestorSelector`, and
 * registers it as the current ancestor
 * @param {string} ancestorSelector 
 * @param {Object} world 
 */
const isAncestor = async (parentContainer, ancestorSelector, world) => {
  const containerDescritor = parentContainer //this is a descriptor, in plain english, of the parent element such as session,listing, asset, etc.  currently not used anywhere and only included to make the step expression more readable
  //const ancestor = getElements(ancestorSelector)
  const ancestor = getElement(ancestorSelector)

  world.meta = {
    ancestor,
    ancestorSelector,
  }

  return ancestor
}

/*
NNQA Note : commenting out expressions so they don't show up in the step expression list in the UI
keeping the code because the replacement, ancestorAbstracted, references isAncestor
this may change/go away once we have finalized how we want to alias the selectors
also changed the function from getElements to getElement because it should only find one
*/

//Given(`the element {string} is ancestor/parent`, isAncestor)
//Given(`the {string} container element {string} is found`, isAncestor)

module.exports = { isAncestor }
