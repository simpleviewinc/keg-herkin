
/**
 * Scroll the page to the given element
 * @param  {String}   selector Element selector
 */
const scroll = (selector) => {
  $(selector).scrollIntoView()
}

module.exports = {
  scroll
}