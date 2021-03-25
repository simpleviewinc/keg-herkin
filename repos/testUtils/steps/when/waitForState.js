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

  return page.waitForSelector(selector, state)
}

states.map(state => 
  When(
    `I wait for {string} to be ${state}`, 
    (selector, world) => waitForState(selector, state, world)
  )
)

When('I wait for {string}', selector => waitForState(selector, 'visible'))


module.exports = {
  waitForState
}