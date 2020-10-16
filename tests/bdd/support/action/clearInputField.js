
/**
 * Clear a given input field (placeholder for WDIO's clearElement)
 * @param  {String}   selector Element selector
 */
const clearInputField = (selector) => {
  $(selector).clearValue()
};

module.exports = {
  clearInputField
}