const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Given(/the page url is (\S+)$/, async url => {
  const page = await getPage()
  await page.goto(url)
})
