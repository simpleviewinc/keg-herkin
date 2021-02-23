const { Then } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

Then('the descendent {string} contains the text {string}', async (selector, data, world) => {
  const page = await getPage()
  const { ancestor } = world

  const content = await ancestor.element.$eval(selector, el => el.textContent)
  // const content = await page.$eval(ancestor.getFullSelector(selector), el => el.textContent)

  expect(content).toEqual(expect.stringContaining(data))
})

