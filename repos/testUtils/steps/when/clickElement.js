const { When } = require("cucumber")
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

When(/I click the element (\S+)/, async selector => {
  console.log('clicking selector', selector)
  const page = await getPage()
  await page.click(selector)
})

