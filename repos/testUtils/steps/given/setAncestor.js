const { Given } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')
 
/**
* Finds the element matching selector returned from selectorAlias, and
* registers it as the current ancestor
* @param {string} ancestorSelector 
* @param {string} alias
* @param {string} data
* @param {Object} world
*/

//example of how selectors can be mapped to aliases
//this step definition is a core step therefore the mapping wouldn't be included here
//mapping could be added to mounted world.js that would, in future, be accessible via the UI
const selectorAlias = {
   session : (data) => {
       return `.ef-grid-item-content:has(div:text('${data}'))`
   },
   filter_modal : (data) => {
       return `.evf-modal:has(h5:text('${data}'))`
   },
   //if an element isn't mapped pass selector as the {word} (no quotes) and actual selector as {string}
   selector : (data) => {
       return data
   },
}

const findElSetAsAncestor = async (alias, data, world) => {
    const ancestorSelector = selectorAlias[alias](data)
    const ancestor = getElement(ancestorSelector)

    world.meta = {
        ancestor,
        ancestorSelector,
    }

    return ancestor
}

Given('the {word} titled/identifier {string} is found', findElSetAsAncestor)
 
module.exports = { findElSetAsAncestor }