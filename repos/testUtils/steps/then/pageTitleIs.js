const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that the page title is `title`
 * @param {*} title 
 */
const pageTitleIs = async (title) => {
  const page = await getPage()
  //expect(await page.title()).toBe(title)
  //return page
  const actualTitle = await page.title()
  if (title != actualTitle) 
    throw new Error('Actual page title is "' + actualTitle + '" but is expected to be "' + title + '".')
  return expect(actualTitle).toBe(title)
}

Then('the page title is {string}', pageTitleIs, {
  description: 'Verifies page title is expected string.\n\nModule : pageTitleIs',
  expressions: [
    {
      type: 'string',
      description: 'Expected page title.',
      example: 'Simpleville - Hotels',
    }
  ]
})

module.exports = { pageTitleIs }