const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Checks that the page title is `title`
 * @param {*} title 
 */
const pageTitleIs = async (title) => {
  const page = await getPage()
  expect(await page.title()).toBe(title)
  return page
}

Then('the page title is {string}', pageTitleIs)

module.exports = { pageTitleIs }