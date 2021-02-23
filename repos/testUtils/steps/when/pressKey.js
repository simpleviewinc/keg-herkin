const { When } = require('HerkinParkin')
const { capitalize } = require('@keg-hub/jsutils')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const pressKey = async key => {
  const page = await getPage()
  await page.keyboard.press(capitalize(key))
  return page
}

When('I press {string}', pressKey)
When('I press the key {string}', pressKey)

module.exports = { pressKey }

