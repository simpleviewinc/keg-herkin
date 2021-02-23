const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const openUrl = async site => {
  const page = await getPage()
  await page.goto(site)
  return page
}

Given('I open the site {string}', openUrl)
Given('I am on {string}', openUrl)
Given('the page url is {string}', openUrl)

module.exports = { openUrl }
