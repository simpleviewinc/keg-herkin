import { isFunc } from '@keg-hub/jsutils'
import { stringToDom } from '../../utils/stringToDom'

export class Page {

  constructor(parentPage){
    this.parentPage = parentPage

    return Object.entries(parentPage)
      .reduce((wrapped, [name, method]) => {
        wrapped[name] = isFunc(this[name])
          ? this[name]
          : method
        return wrapped
      }, {})
  }


  /**
  * Selector method that wraps the parents page#selector method
  * @function
  * @private
  * @param {string} selector - CSS selector for finding a dom element
  * @param {Object|string} context - Root element search from
  *
  * @return {Object} - DOM node rebuilt from the reponse.outerHTML string of the Parent
  */
  $ = async (selector, context) => {
    const response = await this.parentPage.$(
      selector,
      context,
    )

    return stringToDom(response)
  }

  /**
  * Selector method for multiple elements that wraps the parents page#group_selector method
  * @function
  * @private
  * @param {string} selector - CSS selector for finding a dom elements
  * @param {Object|string} context - Root element search from
  *
  * @return {Object} - DOM nodes rebuilt from the response.outerHTML string of the Parent
  */
  $$ = async (selector, context) => {
    const response = await this.parentPage.$$(
      selector,
      context,
    )

    return response.map(stringToDom)
  }

  /**
  * Eval method that wraps the parents page#eval method
  * @function
  * @private
  * @param {string} selector - CSS selector for finding a dom elements
  * @param {string|function} pageFunction - Method to run on the parent
  * @param {*} arg - Extra argument to pass to the parent
  *
  * @return {*} - Response from the pageFunction evaluated within the Parent Page
  */
  $eval = async (selector, pageFunction, arg) => {
    const response = await this.parentPage.$eval(
      selector,
      pageFunction,
      arg
    )

    return response
  }

}