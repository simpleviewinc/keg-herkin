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
  //step fails when capitalize is called.
  //await page.keyboard.press(capitalize(key))
  await page.keyboard.press(key)
  return page
}

When('I press the key {string}', pressKey, {
  description: 'Triggers a keyboard event.\n\nOptions : https://playwright.dev/docs/api/class-page?_highlight=press#pagepressselector-key-options\n\nModule : pressKey',
  expressions: [
    {
      type: 'string',
      description: 'The keyboard key.\n\nExamples : \n\nSingle key : I press the key "PageDown"\nShortcut combination : I press the key "Control+a"',
      example: 'PageDown',
    },
  ]
})

module.exports = { pressKey }

