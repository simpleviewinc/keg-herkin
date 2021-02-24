const { When } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

const clickDescendent = async (selector, world) => {
  if (!world.meta || !world.meta.ancestor)
    throw new Error('Found no registered ancestor. Ensure you precede this definition with an ancestor registration step.')

  const descendent = await getElement(`${world.meta.ancestorSelector} >> ${selector}`)
  if (!descendent)
    throw new Error(`Found no descendent of "${world.meta.ancestorSelector}", with selector: "${selector}"`)

  return descendent.click()
}

When('I click the descendent {string}', clickDescendent)

module.exports = { clickDescendent }
