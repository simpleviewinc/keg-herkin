const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Given('I open the site {string}', async site => {
  const page = await getPage()
  await page.goto(site)
})
