const { Parkin } = require('@ltipton/parkin')
const { world } = require('HerkinRepos/testUtils/support')

/**
 * Parkin singleton instance, accepting the 
 * herkin world: a merge of herkin defaults with 
 * the client's world object
 */
module.exports = {
  parkin: new Parkin(world)
}