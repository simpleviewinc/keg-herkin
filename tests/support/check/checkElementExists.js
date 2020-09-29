const { checkIfElementExists } = require("../lib/checkIfElementExists")
/**
 * Check if the given element exists
 * @param  {String}   isExisting Whether the element should be existing or not
 *                               (an or no)
 * @param  {String}   selector       Element selector
 */
const _checkElementExists = (isExisting, selector) => {
  const falseCase = isExisting === 'an'
    ? false
    : true

  checkIfElementExists(selector, falseCase)
}

module.exports = {
  checkIfElementExists: _checkElementExists
}