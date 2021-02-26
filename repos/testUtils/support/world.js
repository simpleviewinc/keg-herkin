const { setWorldConstructor } = require('@cucumber/cucumber')
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

setWorldConstructor(function (options={}) {
  this.app = options.app || HerkinWorld.app
})

module.exports.world = HerkinWorld