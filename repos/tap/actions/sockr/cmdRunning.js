import { devLog } from 'SVUtils'
import { get } from '@keg-hub/jsutils'
import { testRunModel } from 'SVModels'
import { getStore } from 'SVStore'
import { setTestRun } from '../runner/setTestRun'
import { Values } from 'SVConstants'
import { setScreen } from 'SVActions/screens/setScreen'

const { CATEGORIES, SCREENS } = Values

/**
 * Dispatches that a command is running
 * @param {Object} data - Message data from the socket
 *
 * @returns {void}
 */
export const cmdRunning = data => {
  const { items } = getStore().getState()
  const activeTestFile = get(items, CATEGORIES.ACTIVE_TEST_FILE)

  if(!activeTestFile || !activeTestFile.fileType)
    return devLog(`error`, `Can not set command running. No active test file exists!`)

  // Build the testFile model
  const builtModel = testRunModel({
    file: activeTestFile.location,
    testType: activeTestFile.fileType,
    lastRun: data.timestamp,
    active: true,
    running: true,
    output: [
      `Running ${activeTestFile.fileType} tests for ${activeTestFile.name}`
    ]
  })

  setTestRun(builtModel)

  // Switch to the results screen automatically
  // setScreen(SCREENS.RESULTS)

}
