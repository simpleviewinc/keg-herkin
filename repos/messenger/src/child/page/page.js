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


  $ = async (selector, context) => {
    const response = await this.parentPage.$(
      selector,
      context,
    )

    return stringToDom(response)
  }

  $$ = async (selector, context) => {
    const response = await this.parentPage.$$(
      selector,
      context,
    )

    return response.map(stringToDom)
  }

  $eval = async (selector, pageFunction, arg) => {
    const response = await this.parentPage.$eval(
      selector,
      pageFunction,
      arg
    )

    return response
  }

}