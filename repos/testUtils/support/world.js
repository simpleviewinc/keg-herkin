const { getClientWorld } = require('./getClientWorld')
const { deepMerge } = require('@keg-hub/jsutils')

/**
 * Merge of world defaults with client world
 */
const HerkinWorld = deepMerge({
  app: {
    url: process.env.HERKIN_APP_URL
  }
}, getClientWorld())

module.exports.world = HerkinWorld