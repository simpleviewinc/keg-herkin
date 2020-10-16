
/**
 * Check the offset of the given element
 * @param  {String}   selector              Element selector
 * @param  {String}   falseCase         Whether to check if the offset matches
 *                                      or not
 * @param  {String}   expectedPosition  The position to check against
 * @param  {String}   axis              The axis to check on (x or y)
 */
const checkOffset = (selector, falseCase, expectedPosition, axis) => {
  var location = $(selector).getLocation(axis)
  var intExpectedPosition = parseFloat(expectedPosition)

  if (falseCase) {
    expect(location).not.toEqual(intExpectedPosition, "Element \"".concat(selector, "\" should not be positioned at ") + "".concat(intExpectedPosition, "px on the ").concat(axis, " axis"))
  }
  else {
    expect(location).toEqual(intExpectedPosition, "Element \"".concat(selector, "\" should be positioned at ") + "".concat(intExpectedPosition, "px on the ").concat(axis, " axis, but was found ") + "at ".concat(location, "px"))
  }
}

module.exports = {
  checkOffset
}