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

When('I press the key {string}', pressKey, {
  description: 'Triggers a keyboard event.\n\nOptions : https://playwright.dev/docs/api/class-page?_highlight=press#pagepressselector-key-options\n\nModule : pressKey',
  expressions: [
    {
      type: 'string',
      description: 'The element selector.  Selector must be specific enough to locate a single element.  Valid for checkbox and radio inputs.\n\nExamples : \n\nSingle char : I press the key "a"\nShortcut combination : I press the key "Control+c"',
      example: 'a',
    },
  ]
})

module.exports = { pressKey }

