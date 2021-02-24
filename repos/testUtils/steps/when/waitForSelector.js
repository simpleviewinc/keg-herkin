const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const waitForSelector = async (selector, state) => {
  const page = await getPage()
  return page.waitForSelector(selector, state)
}

// register a step for each playwright element state
;[
  'attached',
  'detached',
  'visible',
  'hidden',
].map(state => When(
  `I wait for {string} to be ` + state, 
  sel => waitForSelector(sel, state)
))

When('I wait for {string}', sel => waitForSelector(sel, 'visible'))

module.exports = { waitForSelector }