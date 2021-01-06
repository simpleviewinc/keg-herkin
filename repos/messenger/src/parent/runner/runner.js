import { noOpObj, get, set } from "@keg-hub/jsutils"
import expect from "expect"
import { describe, test, run } from "jest-circus-browser"

/**
* Executes the tests inside a scoped function
* @function
* @private
* <br/> Builds the tests function dynamically, and injects the passed in tests
* @param {string} testCode - Tests to run in the Parent browser context
* @param {Object} page - Methods that allow accessing the Dom in the Parents context
*
* @return {Object} - The current global state of jest
*/
const execTests = (testCode, page=noOpObj) => {
  return Function(`return (describe, test, expect, run, page) => {
    ${testCode}
    return run()
  }`)()(describe, test, expect, run, page)
}

/**
* Gets gets global state from the window
* @function
* @private
*
* @return {Object} - The current global state of jest
*/
const getJestSymbolData = () => {
  const jestSym = Object.getOwnPropertySymbols(window)
    .find(sym => String(sym) === `Symbol(JEST_STATE_SYMBOL)`)

  return window[jestSym]
}


export class Runner {

  constructor(config){
    this.page = config.page || noOpObj
    this.jestState = getJestSymbolData()
  }

  /**
  * Clears previous test runs to ensure they are not duplicated
  * @memberof Runner
  * @function
  *
  * @return {void}
  */
  clearPreviousTests(){
    get(this.jestState, 'currentDescribeBlock.children', []).length &&
      set(this.jestState, 'currentDescribeBlock.children', [])
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