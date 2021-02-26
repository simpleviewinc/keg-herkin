const { Then } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

const isAttached = async selector => getElement(selector) 

Then('the element {string} is attached', isAttached)

module.exports = { isAttached }