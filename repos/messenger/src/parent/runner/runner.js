import { noOpObj, noOp, get, set } from "@keg-hub/jsutils"
import {describe, it, expect, run} from 'codeamigo-jest-lite'

/**
* Holds the global Jest state
* @object
*/
let globalJestState

/**
* Executes the tests inside a scoped function
* <br/> Builds the tests function dynamically, and injects the passed in tests
* @function
* @private
* @param {string} testCode - Tests to run in the Parent browser context
* @param {Object} page - Methods that allow accessing the Dom in the Parents context
*
* @return {Object} - Response from the run tests
*/
const execTests = (testCode, page=noOpObj) => {
  return Function(`return (describe, it, test, expect, run, page) => {
    ${testCode}
    return run()
  }`)()(describe, it, it, expect, run, page)
}

/**
* Gets gets global state from the window
* @function
* @private
*
* @return {Object} - The current global state of jest
*/
const setGlobalJestState = () => {
  if(globalJestState) return globalJestState

  const jestSym = Object.getOwnPropertySymbols(window)
    .find(sym => String(sym) === `Symbol(JEST_STATE_SYMBOL)`)

  globalJestState = window[jestSym]

  return globalJestState
}


export class Runner {

  constructor(config=noOpObj){
    this.page = config.page || noOpObj
    this.toggleHerkin = config.toggleHerkin || noOp
    setGlobalJestState()
  }

  /**
  * Clears previous test runs to ensure they are not duplicated
  * @memberof Runner
  * @function
  *
  * @return {void}
  */
  clearPreviousTests(){
    get(globalJestState, 'currentDescribeBlock.children', []).length &&
      set(globalJestState, 'currentDescribeBlock.children', [])
  }

  /**
  * Clears previous test runs to ensure they are not duplicated
  * @memberof Runner
  * @function
  * @param {string} testCode - Tests to run in the Parent browser context
  *
  * @return {Object} - Results from the tests being run
  */
  async runTests(testCode){
    const results = await execTests(testCode, this.page)

    return results
  }

}