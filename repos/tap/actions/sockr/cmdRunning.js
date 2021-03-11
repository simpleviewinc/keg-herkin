import { addToast } from '../toasts/addToast'
import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { get, noOpObj } from '@keg-hub/jsutils'
import { testRunModel } from 'SVModels'
import { setTestRun } from '../runner/setTestRun'
import { setScreenById } from 'SVActions/screens/setScreenById'
import { getResultsActiveFile } from 'SVUtils/helpers/getResultsActiveFile'

const { CATEGORIES, SCREENS } = Values

/**
 * Dispatches that a command is running
 * @param {Object} data - Message data from the socket
 *
 * @returns {void}
 */
export const cmdRunning = data => {
  const { items } = getStore().getState()
  const activeFile = getResultsActiveFile() || noOpObj

  if(!activeFile || !activeFile.fileType)
    return addToast({
      type: `error`,
      timeout: 6000,
      message: `Can not set command running. No active test file exists!`
    })

  // Build the testFile model
  const builtModel = testRunModel({
    file: activeFile.location,
    testType: activeFile.fileType,
    lastRun: data.timestamp,
    active: true,
    running: true,
    output: [
      `Running ${activeFile.fileType} tests for ${activeFile.name}`
    ]
  })

  setTestRun(builtModel)

  // Switch to the results screen automatically
  // setScreenById(SCREENS.RESULTS)

}
