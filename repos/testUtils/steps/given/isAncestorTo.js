const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * @param {string} ancestorSelector - ancestor of descendent
 * @param {string} descendentSelector - descendent to get
 * @param {Object} options
 * @param {boolean} [options.deep=true] - if true, will search deeply in ancestor tree for the descendent. If false, only looks at ancestor's immediate children.
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

/**
 * Commenting out step expressions so they don't show in the list of steps in the UI 
 * This requires that the ancestor and descendent be passed in the same step which is a problem (verbosity and awkward step expressions) that was solved in establishing the ancestor using ancestorAbstracted.js and then referencing descendent elements in subsequent steps
 * This essentially does in one step what ancestorAbstracted.js followed by decendent step(s) will do except it just asserts the relationship and doesn't interact with elements
 * Does it matter if the step in a test fails because the element isn't found when the step will fail when trying to interact/evaluate some value when the element isn't found?
 */

// example: The element ".foo" is parent/ancestor to child/descendent
// Given(
//   'the element {string} is parent to {string}',
//   (selector, childSelector, world) => isAncestorTo(selector, 'child', childSelector, world),
//   {
//     description: 'Creates a parent child relationship between two elements.',
//     expressions: [
//       {
//         type: 'string',
//         description: 'Dom element selector of the parent element.',
//         example: '#element-parent-id',
//       },
//       {
//         type: 'string',
//         description: 'Dom element selector of the child element.',
//         example: '#element-child-id',
//       },
//     ]
//   }
// )
// Given(
//   'the element {string} is ancestor to {string}', 
//   (selector, descendentSelector, world) => isAncestorTo(selector, 'descendent', descendentSelector, world)
// )


//module.exports = { isAncestorTo }
