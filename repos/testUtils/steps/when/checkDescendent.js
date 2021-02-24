const { When } = require('HerkinParkin')
const { checkElement } = require('./checkElement')

const checkDescendent = async (selector, world) => {
  if (!world.meta || !world.meta.ancestor)
    throw new Error('Register an ancestor first')

  return checkElement(`${world.meta.ancestorSelector} ${selector}`)
}

When(`I check the descendent {string}`, checkElement)

module.exports = {
  checkDescendent
}
