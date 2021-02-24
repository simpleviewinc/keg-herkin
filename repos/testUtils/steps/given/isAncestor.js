const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const isAncestor = async (ancestorSelector, world) => {
  const page = await getPage()

  const ancestor = page.$(ancestorSelector)
  if (!ancestor)
    throw new Error(`Could not find any element with selector ${ancestorSelector}`)

  world.meta = {
    ancestor,
    ancestorSelector,
  }

  return page
}

Given(`the element {string} is ancestor`, isAncestor)
Given(`the element {string} is parent`, isAncestor)

module.exports = { isAncestor }
