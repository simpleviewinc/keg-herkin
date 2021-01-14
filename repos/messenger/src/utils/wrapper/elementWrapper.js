/**
 * Clicks the element
 * @param {Element=} el - DOM element 
 * @param {Object} props - see https://playwright.dev/docs/api/class-elementhandle#elementhandleclickoptions
 */
const click = (el, props) => el?.click?.(props)
/**
 * Returns element attribute value
 * @param {Element=} el - DOM element 
 * @param {string} name - Attribute name to get the value for
 * @returns {null|string}
 */
const getAttribute = (el, name) => console.log(`---------- Not Implemented ----------`)

/**
 * Call focus on the element
 * @param {Element=} el - DOM element 
 */
const focus = (el) => el?.focus?.()

/**
 * @param {Element=} el - DOM element 
 * @returns {string}
 */
const innerText = (el) => el?.innerText

/**
 * @param {Element=} el - DOM element
 * @returns {string}
 */
const innerHTML = (el) => el?.innerHTML

/**
 * Wraps the element with the same API as playwright's 'ElementHandle'
 * ref: https://playwright.dev/docs/api/class-elementhandle/
 * @param {Element=} el - DOM element 
 * 
 * @returns {Object|null}
 */
export const elementWrapper = (el) => {
  if (!el) return null

  return {
    innerText: () => innerText(el),
    innerHTML: () => innerHTML(el),
    focus: () => focus(el),
    click: (props) => click(el, props),
    getAttribute: (name) => getAttribute(el, name)
  }
}
