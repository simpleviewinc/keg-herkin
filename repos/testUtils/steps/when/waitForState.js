const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

const states = [
  'attached',
  'detached',
  'visible',
  'hidden',
]

/**
 * Waits for the element at `selector` to be in state `state`
 * @param {string} selector 
 * @param {string} state 
 */
const waitForState = async (selector, state) => {
  if (!states.includes(state)) 
    throw new Error('Invalid Selector State: ' + state)

  const page = await getPage()
  return page.waitForSelector(selector, { 
    state: `${state}`,
    timeout: 100
  })
}

When('I wait for element {string} to be {string}', (selector, state) => waitForState(selector, state))


module.exports = {
  waitForState
}
