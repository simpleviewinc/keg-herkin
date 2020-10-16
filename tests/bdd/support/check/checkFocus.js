
/**
 * Check if the given element has the focus
 * @param  {String}   selector  Element selector
 * @param  {String}   falseCase Whether to check if the given element has focus
 *                              or not
 */
const checkFocus = (selector, falseCase) => {
  const hasFocus = $(selector).isFocused()
  falseCase
    ? expect(hasFocus).not.toBe(true, 'Expected element to not be focused, but it is')
    : expect(hasFocus).toBe(true, 'Expected element to be focused, but it is not')
  
}

module.exports = {
  checkFocus
}