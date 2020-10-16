
/**
 * Select a option from a select element by it's index
 * @param  {String}   index      The index of the option
 * @param  {String}   obsolete   The ordinal indicator of the index (unused)
 * @param  {String}   selector Element selector
 *
 * @todo  merge with selectOption
 */
const selectOptionByIndex = (index, obsolete, selector) => {
  const optionIndex = parseInt(index, 10)
  $(selector).selectByIndex(optionIndex)
}

module.exports = {
  selectOptionByIndex
}