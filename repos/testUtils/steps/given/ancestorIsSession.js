const { Given } = require('HerkinParkin')
const { isAncestor } = require('./isAncestor')
//const { getElements } = require('HerkinPlaywright')
 
/**
* Finds the element matching `ancestorSelector`, and
* registers it as the current ancestor
* @param {string} ancestorSelector 
* @param {string} title
* @param {Object} world
*/

const ancestorIsSession = async (title, world) => {
    const sessionSelector = `.ef-grid-item-content:has(div:text('${title}'))`
    return isAncestor("session", sessionSelector, world)
}

// const ancestorIsSession = async (title, world) => {
//    const ancestorSelector = `.ef-grid-item-content:has(div:text('${title}'))`
//    const ancestor = getElements(ancestorSelector)

//     world.meta = {
//       ancestor,
//       ancestorSelector,
//     }

//    return ancestor
// }
 
Given(`the session titled {string} is found`, ancestorIsSession)
 
module.exports = { ancestorIsSession }