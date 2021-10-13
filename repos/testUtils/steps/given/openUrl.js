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

  //isolate query string
  const [baseUrl,urlParams] = url.split('?')
  //console.log('baseUrl : ' + baseUrl + ' , urlParams : ' + urlParams)
  
  //isolate path
  const urlPath = (baseUrl.includes('/') ? baseUrl.substring(baseUrl.indexOf('/'), baseUrl.length) : '')
  //console.log('urlPath : ' + urlPath)

  //isolate domain
  const urlDomain = (baseUrl.includes('/') ? baseUrl.substring(0,baseUrl.indexOf('/')) : baseUrl)
  //console.log('urlDomain : ' + urlDomain)

  const [ _, ...worldPath ] = urlDomain.split('.')
  //console.log('worldPath : ' + worldPath) 

  const parsed = get(world, worldPath)
  //console.log('parsed : ' + parsed)

  const domainAndPath = (urlPath ? parsed.concat(urlPath) : parsed)
  const urlConstruct = (urlParams ? domainAndPath + '?' + urlParams : domainAndPath)

  if (!parsed) 
    throw new Error(`No url found at world path ${url}.`)

  return urlConstruct
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

Given('I navigate to {string}', openUrl, {
  description: 'Navigates to the given website within the browser.\nRequires an absolute URL but the URL can be dynamicly constructed.  See examples below for usage.\nPages that return a status code, even a 404, will pass.  Pages that don\'t return a status code will fail.\n\nModule : openUrl',
  expressions: [
    {
      type: 'string',
      description: 'URL/URI of the website the browser should navigate to.\n\nExamples :\nHard-coded URL in feature : I navigate to "https://www.simpleviewinc.com"\nDomain ($world.myURL) defined in world.js and path added to feature : I navigate to "$world.myURL/nav/assets/images"\nDomain ($world.myURL) defined in world.js and query string added to feature : I navigate to "$world.myURL?testUrlParam=1"\nDomain ($world.myURL) defined in world.js and path and query string added to feature : I navigate to "$world.myURL/search?q=cms"',
      example: 'https://my.website.com',
    }
  ]
})

module.exports = { openUrl }
