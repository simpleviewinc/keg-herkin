const { parkin } = require('./instance')
const { getHerkinConfig } = require('HerkinConfigs/getHerkinConfig')

/**
 * Global helper to allow re-using the same parking instance for each test
 */
global.getParkinInstance = () => parkin


/**
 * TODO: build dynamic options based on the current env
 * Most likely will need to use process.env to pass in options
 * Need a way to get the name, and tags options passed here
 */
global.getParkinOptions = () => ({})
