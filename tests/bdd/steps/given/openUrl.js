const { Given } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()
const qawolf = require('qawolf')

Given(/I open the site (\S+)$/, async site => {
  const page = await getPage()
  await page.goto(site)
  await qawolf.create(page)
})
