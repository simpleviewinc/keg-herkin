
/**
 * Check if the given elements text is the same as the given text
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   selector       Element selector
 * @param  {String}   falseCase     Whether to check if the content equals the
 *                                  given text or not
 * @param  {String}   expectedText  The text to validate against
 */
const checkEqualsText = (elementType, selector, falseCase, expectedText) => {
  var command = 'getValue'

  if (elementType === 'button' || $(selector).getAttribute('value') === null)
    command = 'getText'

  var parsedExpectedText = expectedText
  var boolFalseCase = !!falseCase

  if (typeof parsedExpectedText === 'function') {
    parsedExpectedText = ''
    boolFalseCase = !boolFalseCase
  }

  if (parsedExpectedText === undefined && falseCase === undefined) {
    parsedExpectedText = ''
    boolFalseCase = true
  }

  var text = browser[command](selector)

  boolFalseCase
    ? expect(parsedExpectedText).not.toBe(text)
    : expect(parsedExpectedText).toBe(text)

}

module.exports = {
  checkEqualsText
}