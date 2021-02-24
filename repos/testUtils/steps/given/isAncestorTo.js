const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()


const getDescendentElement = async (ancestorSelector, descendentSelector, { deep=true } = {}) => {
  const page = await getPage()
  const descendent = await page.$(`${ancestorSelector} ${deep ? '>>' : '>'} ${descendentSelector}`)
  if (!descendent)
    throw new Error(`Found no element "${descendentSelector}" descendent to "${ancestorSelector}"`)

  return descendent
}

const getChildElement = (...args) => getDescendentElement(...args, { deep: false })

const isAncestorTo = async (ancestorSelector, descendentType, descendentSelector, world) => {
  const page = await getPage()

  const ancestor = await page.$(ancestorSelector)
  if (!ancestor)
    throw new Error(`Found no ancestor with selector ${ancestorSelector}`)

  // const descendent = await ancestor.$(descendentSelector)
  const descendent = await getDescendentElement(ancestorSelector, descendentSelector)
  if (!descendent)
    throw new Error(`Found no element "${descendentSelector}" descendent to ${ancestorSelector}`)

  world.meta = {
    ancestor,
    descendent,
    descendentType,
    descendentSelector,
    ancestorSelector
  }
}

// example: The element ".foo" is parent/ancestor to child/descendent
Given(
  'the element {string} is parent to {string}', 
  (selector, childSelector, world) => isAncestorTo(selector, 'child', childSelector, world)
)
Given(
  'the element {string} is ancestor to {string}', 
  (selector, descendentSelector, world) => isAncestorTo(selector, 'descendent', descendentSelector, world)
)


module.exports = { isAncestorTo }
