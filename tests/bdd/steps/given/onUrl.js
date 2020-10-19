const { Given } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Given("I am on {url}", async url => {
  const page = await getPage()
  await page.goto(url)
})