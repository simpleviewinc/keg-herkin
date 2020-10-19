const { Given } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Given("I open the {url}", async url => {
  const page = await getPage()
  await page.goto(url)
})
