const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('../../support/setup')
const { getPage } = getBrowserContext()

Then('the count of element {string} is {int}', async (selector, count) => {
  console.log({ typeof: typeof count})
  const page = await getPage()
  const elements = await page.$$(selector)
  expect(elements.length).toEqual(count)
})
