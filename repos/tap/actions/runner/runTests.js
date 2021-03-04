import { WSService } from 'SVServices'
import { EventTypes } from 'SVUtils/sockr'

export const runTests = async (activeFile, testCmd, screenID) => {
  // TODO: define the params as needed based on the command
  const params = {}
  WSService.runCommand(testCmd, params)
}