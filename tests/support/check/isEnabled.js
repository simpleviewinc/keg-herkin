
/**
 * Check if the given selector is enabled
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the given selector
 *                              is enabled or not
 */
const isEnabled = (selector, falseCase) => {
  const isEnabled = $(selector).isEnabled()
  falseCase
    ? expect(isEnabled).not
        .toEqual(true, "Expected element \"".concat(selector, "\" not to be enabled"))
    : expect(isEnabled)
        .toEqual(true, "Expected element \"".concat(selector, "\" to be enabled"))
}

module.exports = {
  isEnabled
}
