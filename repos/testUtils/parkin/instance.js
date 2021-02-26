const { Parkin } = require('@ltipton/parkin')
const { world } = require('HerkinRepos/testUtils/support')

/**
 * Parkin singleton instance
 */
module.exports = {
  parkin: new Parkin(world)
}