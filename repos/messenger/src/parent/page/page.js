import * as events from './events'
import * as interactions from './interactions'
import * as methods from './methods'
import * as noOp from './noOp'
import * as selectors from './selectors'
import * as waitFor from './waitFor'
import { noOpObj, isFunc } from '@keg-hub/jsutils'

export class Page {

  constructor(config=noOpObj){
    Object.assign(
      this,
      config.methods,
      events,
      interactions,
      methods,
      noOp,
      selectors,
      waitFor
    )

    Object.entries(this)
      .map(([ name, method ]) => this[name] = method.bind(this))
  }

}