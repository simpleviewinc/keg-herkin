const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const clickElement = async selector => {
  const page = await getPage()
  await page.click(selector)
  return page
}

When('I click the element {string}', clickElement)
When('I click on {string}', clickElement)
When('I select {string}', clickElement)

module.exports = {
  clickElement
}
