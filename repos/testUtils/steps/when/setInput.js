const { When } = require('HerkinParkin')
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

When(/^I set (.*) to the input (.*)/, async (data, selector) => {
  const page = await getPage()
  const inputSelector = `input${selector}`
  await page.click(inputSelector)
  await page.type(inputSelector, data)
})

