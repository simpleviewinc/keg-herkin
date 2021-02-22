const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Given(/I am on (\S+)$/, async url => {
  const page = await getPage()
  await page.goto(url)
})