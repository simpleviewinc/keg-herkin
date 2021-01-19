export class ElementHandle {

  element = null
  /**
   * Wraps the element with the same API as playwright's 'ElementHandle'
   * ref: https://playwright.dev/docs/api/class-elementhandle/
   * @param {Element=} element - DOM element 
   */
  constructor(element) {
    this.element = element
  }

  /** returns the innerText data */
  innerText = () => this.element?.innerText

  /** returns the inner html data */
  innerHTML = () => this.element?.innerHTML

  /** calls focus on the element */
  focus = () => this.element?.focus?.()

  /**
   * Clicks the element
   * @param {Object} props - see https://playwright.dev/docs/api/class-elementhandle#elementhandleclickoptions
   */
  click = (props) => this.element?.click?.(props)

  /**
   * Returns element attribute value
   * @param {string} name - Attribute name to get the value for
   * @returns {null|string}
   */
  getAttribute = (name) => this.element?.getAttribute?.(name)
}