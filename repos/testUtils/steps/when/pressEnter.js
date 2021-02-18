const { When } = require('HerkinParkin')
const { capitalize } = require('@keg-hub/jsutils')
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

When(/I press (\S+)/, async key => {
  const page = await getPage()
  await page.keyboard.press(capitalize(key))
})

