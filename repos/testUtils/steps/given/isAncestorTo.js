const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * @param {string} ancestorSelector - ancestor of descendent
 * @param {string} descendentSelector - descendent to get
 * @param {Object} options
 * @param {boolean} [options.deep=true] - if true, will search deeply in ancestor tree for the descendent. If false, only looks 
 * at ancestor's immediate children.
 * @return {ElementHandle} - the playwright element that is a descendent of ancestor.
 * @throws {Error} if no element is found
 */
const getDescendentElement = async (ancestorSelector, descendentSelector, { deep=true } = {}) => {
  const page = await getPage()
  const descendent = await page.$(`${ancestorSelector} ${deep ? '>>' : '>'} ${descendentSelector}`)
  if (!descendent)
    throw new Error(`Found no element "${descendentSelector}" descendent to "${ancestorSelector}"`)

  return descendent
}

/**
 * 
 * @param {string} ancestorSelector 
 * @param {string} descendentType 
 * @param {string} descendentSelector 
 * @param {string} world 
 */
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
