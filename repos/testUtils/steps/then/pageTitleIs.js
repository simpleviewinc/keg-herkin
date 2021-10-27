const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that the page title is `title`
 * @param {*} title - text to compare to page title
 */
const pageTitleIs = async (title) => {
  const page = await getPage()
  const actualTitle = await page.title()
  if (title !== actualTitle) 
    throw new Error('Actual page title is "' + actualTitle + '" but is expected to be "' + title + '".')
}

Then('the page title is {string}', pageTitleIs, {
  description: `Verifies page title matches the expected string.
  
Module : pageTitleIs`,
  expressions: [
    {
      type: 'string',
      description: `String expected to match the page title.`,
      example: 'Simpleville - Hotels',
    }
  ]
})

module.exports = { pageTitleIs }