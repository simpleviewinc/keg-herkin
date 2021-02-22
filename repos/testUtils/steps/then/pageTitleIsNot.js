const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()
const expect = require('expect')

Then(/the title is not (\S+)$/, async (title) => {
  const page = await getPage()
  expect(await page.title()).toBe(title)
})