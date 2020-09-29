
const { checkIfElementExists } = require("../lib/checkIfElementExists")


/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   selector Element selector
 */
const clickElement = (action, type, selector) => {
  selector = type === 'link'
    ? "=".concat(selector)
    : selector

  const method = action === 'click'
    ? 'click'
    : 'doubleClick'

  checkIfElementExists(selector)

  $(selector)[method]()
}

module.exports = {
  clickElement
}
