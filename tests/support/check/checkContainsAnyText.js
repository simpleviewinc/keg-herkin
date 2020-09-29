
/**
 * Check if the given elements contains text
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   selector       Element selector
 * @param  {String}   falseCase     Whether to check if the content contains
 *                                  text or not
 */
const checkContainsAnyText = (elementType, selector, falseCase) => {
  const command = elementType === 'button' || $(selector).getAttribute('value') === null
    ? 'getText'
    : 'getValue'

  const text = $(selector)[command]()
  const boolFalseCase = typeof falseCase === 'undefined' ? false : !!falseCase

  boolFalseCase
    ? expect(text).toBe('')
    : expect(text).not.toBe('')

}

module.exports = {
  checkContainsAnyText
}