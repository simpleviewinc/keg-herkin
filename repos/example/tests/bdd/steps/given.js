const { Given } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinRepos/testUtils/support/setup')
const { getPage } = getBrowserContext()

Given('I navigate to {word}', async site => {
  const page = await getPage()
  await page.goto(site)
})
