import { WSService } from 'SVServices'
import { EventTypes } from '@ltipton/sockr'
import { addToast } from 'SVActions/toasts'
import { buildCmdParams } from 'SVUtils/helpers/buildCmdParams'

export const runTests = async (activeFile, testCmd, screenID) => {

  addToast({
    type: 'info',
    message: `Running ${testCmd.name} tests for file ${activeFile.name}!`
  })

  WSService.runCommand(testCmd, buildCmdParams(testCmd, activeFile))
}