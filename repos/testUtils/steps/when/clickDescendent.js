const { When } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')
const { checkForAncestor } = require('HerkinSupport/validate')

const clickDescendent = async (selector, world) => {
  checkForAncestor(world)
  const descendent = await getElement(`${world.meta.ancestorSelector} ${selector}`)
  if (!descendent)
    throw new Error(`Found no descendent of "${world.meta.ancestorSelector}", with selector: "${selector}"`)

  return descendent.click()
}

When('I click the descendent {string}', clickDescendent)

module.exports = { clickDescendent }
