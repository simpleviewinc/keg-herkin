import { runParentTests } from './runParentTests'
import { noOpObj } from "@keg-hub/jsutils"
import expect from "expect"
import { describe, test, run } from "jest-circus-browser"

const execTests = (testCode, page=noOpObj) => {
  return Function(`return (describe, test, expect, run, page) => {
    ${testCode}
    return run()
  }`)()(describe, test, expect, run, page)
}

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

  clearPreviousTests = () => {
    this.jestState?.currentDescribeBlock?.children.length &&
      (this.jestState.currentDescribeBlock.children = [])
  }

  runTests = async (testCode) => {
    await execTests(testCode, this.page)
  }

}