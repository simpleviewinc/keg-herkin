import { addToast } from '../toasts/addToast'
import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { get, noOpObj } from '@keg-hub/jsutils'
import { testRunModel } from 'SVModels'
import { setTestRun } from '../runner/setTestRun'
import { toggleTestRunning } from '../runner/toggleTestRunning'
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
    active: true,
    running: true,
    lastRun: data.timestamp,
    file: activeFile.location,
    testType: activeFile.fileType,
    command: get(data, 'data.cmd'),
    params: get(data, 'data.params'),
    messages: {
      [data.timestamp]: {
        timestamp: data.timestamp,
        message: `Running ${activeFile.fileType} tests for ${activeFile.name}`,
      }
    }
  })

  setTestRun(builtModel)

  toggleTestRunning(true)

  // Switch to the results screen automatically
  // setScreenById(SCREENS.RESULTS)

}
