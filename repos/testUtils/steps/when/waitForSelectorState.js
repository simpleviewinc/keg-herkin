const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()
//const { getElement } = require('HerkinPlaywright')

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

const waitForSelectorState = async (selector,state) => {
  //console.log('selector : ' + selector + ' ; state : ' + state)
  if (!states.includes(state)) 
    throw new Error('Invalid Selector State: ' + state)

  const page = await getPage()
  // 'selector' below is not 'await getElement(selector)' because it adversely affects the results
  // elements that do not exist in the DOM can be either hidden or detached.  hidden elements, however, can exist in the DOM but they have to either have an empty bounding box OR visibility:hidden.
  // getElement will fail when it doesn't find an element in the DOM.  waitForSelector, however, will pass despite not finding the element in the DOM (desired in this case) because we are confirming a negative - that the element does not exist in the DOM OR has empty bounding box/visibility:hidden
  return await page.waitForSelector(selector, { 
    state: `${state}`,
    timeout: 5000
  })
}

When('I wait for element {string} to be {string}', waitForSelectorState, {
  description: 'Locates an element by selector and verifies its state.\nhttps://playwright.dev/docs/api/class-page/#pagewaitforselectorselector-options\n\nModule : waitForSelectorState',
  expressions: [
    {
      type: 'string',
      description: 'The selector for the element.  Selector must be specific enough to locate a single element.',
      example: '.tab-bar-title:text(\'Code Editor\')',
    },
    {
      type: 'string',
      description: 'Expected state.  Valid options : attached, detached, visible, hidden.\n\nExample : I wait for element ".tab-bar-title:text(\'Code Editor\')" to be "visible"',
      example: 'visible',
    }
  ]
})

module.exports = { waitForSelectorState }
