
const { checkIfElementExists } = require("../lib/checkIfElementExists")

/**
 * Set the value of the given input field to a new value or add a value to the
 * current selector value
 * @param  {String}   method  The method to use (add or set)
 * @param  {String}   value   The value to set the selector to
 * @param  {String}   selector Element selector
 */
const setInputField = (method, value, selector) => {
  const command = method === 'add'
    ? 'addValue'
    : 'setValue'

  let checkValue = value
  checkIfElementExists(selector, false, 1)

  if (!value) checkValue = ''

  $(selector)[command](checkValue)
}

module.exports = {
  setInputField
}