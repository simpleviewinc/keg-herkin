
/**
 * Check if the given element exists in the DOM one or more times
 * @param  {String}  selector  Element selector
 * @param  {Boolean} falseCase Check if the element (does not) exists
 * @param  {Number}  exactly   Check if the element exists exactly this number
 *                             of times
 */
const checkIfElementExists = (selector, falseCase, exactly) => {
  const nrOfElements = $$(selector)

  if (falseCase === true) {
    expect(nrOfElements)
      .toHaveLength(0, "Element with selector \"".concat(selector, "\" should not exist on the page"))
  }
  else if (exactly) {
    expect(nrOfElements)
      .toHaveLength(exactly, "Element with selector \"".concat(selector, "\" should exist exactly ") + "".concat(exactly, " time(s)"))
  }
  else {
    expect(nrOfElements.length)
      .toBeGreaterThanOrEqual(1, "Element with selector \"".concat(selector, "\" should exist on the page"))
  }
}

module.exports = {
  checkIfElementExists
}