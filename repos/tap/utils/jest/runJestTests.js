import { noOpObj } from "@keg-hub/jsutils"
import expect from "expect"
import { describe, test, run } from "jest-circus-browser"

export const runJestTests = (testCode, page=noOpObj) => {
  return Function(`return (describe, test, expect, run, page) => {
    ${testCode}
    return run()
  }`)()(describe, test, expect, run, page)
}
