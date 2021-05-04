const { When } = require('HerkinParkin')
const { getElement } = require('HerkinPlaywright')

/**
 * Checks/unchecks the element matching the selector
 * @param {String} action - check action
 * @param {String} selector - playwright selector string
 */
const checkElement = async (action, selector) => {
  //console.log('action : ' + action + ' - selector : ' + selector)
  const box = await getElement(selector)
  //await box.check()
  const boxAction = (action === 'check') ? await box.check() : await box.uncheck()
  return box
}

When(`I {string} the element {string}`, checkElement, {
  description: 'Locates a select element by selector and either checks or unchecks it.\n\nModule : checkElement',
  expressions: [
    {
      type: 'string',
      description: 'Valid options are \'check\' or \'uncheck\' only.',
      example: 'check',
    },
    {
      type: 'string',
      description: 'The element selector.  Selector must be specific enough to locate a single element.  Valid for checkbox and radio inputs.',
      example: 'input[name=\'unique_name\']',
    },
  ]
})

module.exports = {
  checkElement
}
