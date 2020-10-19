const { When } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

When("I press enter", async elementContext => {
  const page = await getPage()
  await page.press(elementContext, "Enter");
})

