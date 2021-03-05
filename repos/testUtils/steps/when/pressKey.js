const { When } = require('HerkinParkin')
const { capitalize } = require('@keg-hub/jsutils')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Simulates a key press
 * @param {string} key - key name
 * @see possible `key` values here: https://playwright.dev/docs/api/class-page?_highlight=press#pagepressselector-key-options
 */
const pressKey = async key => {
  const page = await getPage()
  await page.keyboard.press(capitalize(key))
  return page
}

When('I press the key {string}', pressKey)

module.exports = { pressKey }

