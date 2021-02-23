const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()
const expect = require('expect')

const pageTitleIsNot = async (title) => {
  const page = await getPage()
  expect(await page.title()).not.toBe(title)
  return page
}

Then('the title is not {string}', pageTitleIsNot)

module.exports = { pageTitleIsNot }