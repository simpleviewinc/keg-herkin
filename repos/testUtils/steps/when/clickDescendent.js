const { When } = require('HerkinParkin')
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

When('I click the element {string}', async selector => {
  const page = await getPage()
  await page.click(selector)
})
