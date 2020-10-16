
/**
 * Check the given property of the given element
 * @param  {String}   isCSS         Whether to check for a CSS property or an
 *                                  attribute
 * @param  {String}   attrName      The name of the attribute to check
 * @param  {String}   selector          Element selector
 * @param  {String}   falseCase     Whether to check if the value of the
 *                                  attribute matches or not
 * @param  {String}   expectedValue The value to match against
 */
const checkProperty = (isCSS, attrName, selector, falseCase, expectedValue) => {
  var command = isCSS ? 'getCSSProperty' : 'getAttribute'
  var attrType = isCSS ? 'CSS attribute' : 'Attribute'
  var attributeValue = $(selector)[command](attrName)

  expectedValue = isFinite(expectedValue)
    ? parseFloat(expectedValue)
    : expectedValue

  if (attrName.match(/(color|font-weight)/)) attributeValue = attributeValue.value

  if (falseCase) {
    expect(attributeValue).not.toEqual(expectedValue, "".concat(attrType, ": ").concat(attrName, " of element \"").concat(selector, "\" should ") + "not contain \"".concat(attributeValue, "\""))
  }
  else {
    expect(attributeValue).toEqual(expectedValue, "".concat(attrType, ": ").concat(attrName, " of element \"").concat(selector, "\" should ") + "contain \"".concat(attributeValue, "\", but \"").concat(expectedValue, "\""))
  }
}

module.exports = {
  checkProperty
}