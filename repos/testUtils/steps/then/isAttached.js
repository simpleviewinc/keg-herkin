const { Then } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

/**
 * Checks that the element is on the DOM
 * @param {string} selector 
 */
const isAttached = async selector => getElement(selector) 

Then('the element {string} is attached', isAttached)

module.exports = { isAttached }