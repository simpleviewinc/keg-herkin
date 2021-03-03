const { When } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

/**
 * Checks the element matching the selector
 * @param {String} selector - playwright selector string
 */
const checkElement = async selector => {
  const box = await getElement(selector)
  await box.check()
  return box
}

When(`I check the element {string}`, checkElement)

module.exports = {
  checkElement
}
