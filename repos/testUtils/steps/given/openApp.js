const { Given } = require('HerkinParkin')
const { openUrl } = require('./openUrl')

/**
 * Opens the url of the consuming app in a playwright browser
 * @param {object} world 
 */
const openApp = async world => openUrl(world.app.url, world)

Given('I open my app', openApp)

module.exports = { openApp }
