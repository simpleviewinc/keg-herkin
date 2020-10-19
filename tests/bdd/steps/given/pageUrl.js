const { Given } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Given("the page url is {url}", async url => {
  const page = await getPage()
  await page.goto(url)
})
