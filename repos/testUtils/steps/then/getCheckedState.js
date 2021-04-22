const { Then } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

const checkedStates = [
    'checked',
    'unchecked',
]

/**
 * Checks the element matching the selector
 * @param {String} selector - playwright selector string
 * @param {string} state 
 */

const getCheckedState = async (selector, state) => {

    if (!checkedStates.includes(state)) 
        throw new Error('Invalid Check State: ' + state)

    const box = await getElement(selector)
    const checkedState = await box.isChecked() //boolean
    const stateConversion = (state == 'checked' ? true : false)
    if (stateConversion != checkedState){
        throw new Error("Element checked state is " + checkedState + " but expected check state is " + stateConversion)
    }

    return checkedState
}

Then(`the element {string} checked state is {string}`, (selector, state) => getCheckedState(selector, state), {
    description: 'Locates a checkbox element by selector and verifies its checked state, checked or unchecked.',
    expressions: [
      {
        type: 'string',
        description: 'The selector for the checkbox.  Selector must be specific enough to locate a single element.',
        example: 'input[name=\'unique_name\']',
      },
      {
        type: 'string',
        description: 'Valid options are \'checked\' or \'unchecked\' only.',
        example: 'checked',
      }
    ]
  })

module.exports = {
    getCheckedState
}
