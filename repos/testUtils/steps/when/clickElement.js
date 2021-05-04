const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()

/**
 * Click the element matching `selector`
 * @param {String} selector - playwright selector
 */
const clickElement = async selector => {
  const page = await getPage()
  return page.click(selector)
}

When('I click the element {string}', clickElement, {
  description: 'Locates a element by selector and clicks it.\n\nModule : clickElement',
  expressions: [
    {
      type: 'string',
      description: 'The element selector.  Selector must be specific enough to locate a single element.  Valid for checkbox and radio inputs.',
      example: 'button[name=\'unique_name\']',
    },
  ]
})

module.exports = {
  clickElement
}
