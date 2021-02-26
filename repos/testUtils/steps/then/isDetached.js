const { Then } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

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