const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

When('I click the element {string}', async selector => {
  const page = await getPage()
  await page.click(selector)
})
