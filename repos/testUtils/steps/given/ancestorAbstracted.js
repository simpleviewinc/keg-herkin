const { Given } = require('HerkinParkin')
const { isAncestor } = require('HerkinSteps')
 
/**
* Finds the element matching `ancestorSelector`, and
* registers it as the current ancestor
* @param {string} title
* @param {Object} world
*/

//example of how selectors can be mapped to aliases
//this step definition is a core step therefore the mapping wouldn't be included here
//mapping could be added to mounted world.js that would, in future, be accessible via the UI
const typesMap = {
   session : (title) => {
       return `.ef-grid-item-content:has(div:text('${title}'))`
   },
   filter_modal : (title) => {
       return `.evf-modal:has(h5:text('${title}'))`
   },
   //if an element isn't mapped the user can pass "selector" as the {word} and the actual selector as the string like before
   selector : (title) => {
       return title
   },
}

const parentContainerIsFound = async (type, title, world) => {
   const itemSelector = typesMap[type](title)
   return isAncestor(type, itemSelector, world)
}

Given('the {word} titled/identifier {string} is found', parentContainerIsFound)
 
module.exports = { parentContainerIsFound }