
/**
 * Check if the given elements contains text
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   selector       Element selector
 * @param  {String}   falseCase     Whether to check if the content contains
 *                                  the given text or not
 * @param  {String}   expectedText  The text to check against
 */
const checkContainsText = (elementType, selector, falseCase, expectedText) => {

  let command = 'getValue'
  const hasValue = $(selector).getAttribute('value') === null
  const matchingEl = ['button', 'container'].includes(elementType)
  if (matchingEl || hasValue) command = 'getText'

  let boolFalseCase
  let stringExpectedText = expectedText
  const elem = $(selector)
  elem.waitForDisplayed()
  const text = elem[command]()

  if (typeof expectedText === 'undefined') {
    stringExpectedText = falseCase
    boolFalseCase = false
  }
  else {
    boolFalseCase = falseCase === ' not'
  }

  boolFalseCase
    ? expect(text).not.toContain(stringExpectedText)
    : expect(text).toContain(stringExpectedText)

}

module.exports = {
  checkContainsText
}