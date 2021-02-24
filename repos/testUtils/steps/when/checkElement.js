const { When } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

const checkElement = async selector => {
  const box = await getElement(selector)
  if (!box)
    throw new Error(`Could not find element ${selector}`)
  
  await box.check()

  return box
}

When(`I check the element {string}`, checkElement)

module.exports = {
  checkElement
}
