const { Then } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

/**
 * Checks that the element is not on the DOM
 * @param {string} selector 
 */
const isDetached = async selector => {
  let element = null;
  try {
    element = await getElement(selector) 
  }
  catch (err) {}
  finally {
    expect(element).toEqual(null)
  }
}

Then('the element {string} is detached', isDetached)

module.exports = { isDetached }