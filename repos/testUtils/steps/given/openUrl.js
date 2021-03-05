const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()
const { get, isStr } = require('@keg-hub/jsutils')

/**
 * Parses the url, replacing any dynamic variables
 * @param {string} url 
 * @param {Object} world 
 * @return {string} - updated url
 */
const parseUrl = (url, world) => {
  if (!url.startsWith(`$world`)) return url

  const [ _, ...worldPath ] = url.split('.')
  const parsed = get(world, worldPath)
  if (!parsed) 
    throw new Error(`No url found at world path ${url}.`)

  return parsed
}

/**
 * Opens the url in a playwright browser
 * @param {string} url 
 * @param {object} world 
 */
const openUrl = async (url, world) => {
  const site = parseUrl(url, world)
  if (!isStr(site))
    throw new Error(`Site must be a valid URL. Found: ${site}`)

  const page = await getPage()
  await page.goto(site)
  return page
}

Given('I open the site/url/uri {string}', openUrl)
Given('I am on the site/url/uri {string}', openUrl)
Given('the page/site url/uri is {string}', openUrl)
Given('the user navigates to {string}', openUrl)

module.exports = { openUrl }
