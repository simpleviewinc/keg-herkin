const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()
const expect = require('expect')

/**
 * Checks that the page title is not `title`
 * @param {string} title 
 */
const pageTitleIsNot = async (title) => {
  const page = await getPage()
  expect(await page.title()).not.toBe(title)
  return page
}

Then('the page title is not {string}', pageTitleIsNot)

module.exports = { pageTitleIsNot }