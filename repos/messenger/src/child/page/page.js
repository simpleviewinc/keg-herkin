import { isFunc } from '@keg-hub/jsutils'

export class Page {
  constructor(parentPage) {
    this.parentPage = parentPage

    return Object.entries(parentPage).reduce((wrapped, [ name, method ]) => {
      wrapped[name] = isFunc(this[name]) ? this[name] : method
      return wrapped
    }, {})
  }
}
