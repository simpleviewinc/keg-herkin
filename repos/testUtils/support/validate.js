const { isObj } = require('@keg-hub/jsutils')

/**
 * Validates that the world input is a valid world object
 * @param {Object?} world 
 */
const validateWorld = world => {
  if (!isObj(world))
    throw new Error(`World must be an object. Found ${world}`)
}

/**
 * Validates that the world object has a registered ancestor
 * @param {Object} world 
 */
const checkForAncestor = world => {
  validateWorld(world)

  if (!isObj(world.meta) || !isObj(world.meta.ancestorSelector))
    throw new Error('Cannot find ancestor. Use an ancestor-registration step before running this step')
}

module.exports = { checkForAncestor }