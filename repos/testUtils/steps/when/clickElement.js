const { When } = require('HerkinParkin')
const { getBrowserContext } = require('HerkinSetup')
const { getPage } = getBrowserContext()
const { getElement } = require('HerkinPlaywright')

/**
 * Click the element matching `selector`
 * @param {String} selector - valid playwright selector
 */
const clickElement = async selector => {
  const page = await getPage()
  return page.click(selector)
}

When('I click the element {string}', clickElement, {
  description: `Locates an element by selector and clicks it.

Module : clickElement`,
  expressions: [
    {
      type: 'string',
      description: `The element selector.  Selector must be specific enough to locate a single element.`,
      example: 'button[name=\'unique_name\']',
    },
  ]
})

module.exports = {
  clickElement
}
