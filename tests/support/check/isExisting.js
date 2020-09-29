
/**
 * Check if the given element exists in the current DOM
 * @param  {String}   selector  Element selector
 * @param  {String}   falseCase Whether to check if the element exists or not
 */
const isExisting = (selector, falseCase) => {
  const elements = $$(selector)

  falseCase
    ? expect(elements)
        .toHaveLength(0, "Expected element \"".concat(selector, "\" not to exist"))
    : expect(elements.length)
        .toBeGreaterThan(0, "Expected element \"".concat(selector, "\" to exist"))
}

module.exports = {
  isExisting
}