import { WSService } from 'SVServices'
import { addToast } from 'SVActions/toasts'
import { setActiveTestFile } from './setActiveTestFile'
import { buildCmdParams } from 'SVUtils/helpers/buildCmdParams'

/**
 * Uses a web-socket to run tests on a file from the backend
 * Also updates the current active test file, which is different from the activeFile per-screen
 * @function
 * @param {Object} activeFile - file to set as the activeFile 
 * @param {string} testCmd - Test type to run for this file
 * @param {string} screenID - Id of the screen that called runTests
 * 
 */
export const runTests = async (activeFile, testCmd, screenID) => {

  addToast({
    type: 'info',
    message: `Running ${testCmd.name} tests for file ${activeFile.name}!`
  })

  setActiveTestFile(activeFile)

  WSService.runCommand(testCmd, buildCmdParams(testCmd, activeFile))
}