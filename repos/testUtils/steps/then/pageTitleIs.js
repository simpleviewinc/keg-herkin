const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const pageTitleIs = async (title) => {
  const page = await getPage()
  expect(await page.title()).toBe(title)
  return page
}

Then('the title is {string}', pageTitleIs)

module.exports = { pageTitleIs }