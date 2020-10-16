
/**
 * Check the given property of the given element
 * @param  {String}   isCSS         Whether to check for a CSS property or an
 *                                  attribute
 * @param  {String}   attrName      The name of the attribute to check
 * @param  {String}   elem          Element selector
 * @param  {String}   falseCase     Whether to check if the value of the
 *                                  attribute matches or not
 * @param  {String}   expectedValue The value to match against
 */
const checkFontProperty =(isCSS, attrName, elem, falseCase, expectedValue) => {

  const command = isCSS
    ? 'getCssProperty'
    : 'getAttribute'

  const attrType = isCSS
    ? 'CSS attribute'
    : 'Attribute'

  var attributeValue = browser[command](elem, attrName)

  if (attrName.match(/(font-size|line-height|display|font-weight)/))
    attributeValue = attributeValue.value

  falseCase
    ? expect(attributeValue).not.toBe(
        expectedValue,
        "".concat(attrType, ": ")
          .concat(attrName, " of element \"")
          .concat(elem, "\" should not ") + "contain \""
          .concat(attributeValue, "\"")
      )
    : expect(attributeValue).toBe(
        expectedValue,
        "".concat(attrType, ": ")
          .concat(attrName, " of element \"")
          .concat(elem, "\" should contain ") + "\""
          .concat(attributeValue, "\", but \"")
          .concat(expectedValue, "\"")
      )

}

module.exports = {
  checkFontProperty
}