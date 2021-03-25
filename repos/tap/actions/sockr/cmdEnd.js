import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { addToast } from '../toasts/addToast'
import { get, noOpObj } from '@keg-hub/jsutils'
import { setTestRun } from '../runner/setTestRun'
import { toggleTestRunning } from '../runner/toggleTestRunning'
import { getResultsActiveFile } from 'SVUtils/helpers/getResultsActiveFile'

const { CATEGORIES, SOCKR_MSG_TYPES } = Values

/**
 * Updates a testRunModel to no longer be running
 * @param {Object} data - Message data from the socket
 * @param {Object} testRunModel - The test run model to set running to false
 *
 * @returns {void}
 */
export const cmdEnd = (data, testRunModel) => {
  const { items } = getStore().getState()
  const activeFile = getResultsActiveFile() || noOpObj
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, activeFile.location])

  const exitCode = get(data, 'data.exitCode', 0)

  testRunModel
    ? setTestRun({
        ...testRunModel,
        messages: {
          ...testRunModel.messages,
          [data.timestamp]: {
            message: `Finished running command!\n`,
            timestamp: data.timestamp,
            type: SOCKR_MSG_TYPES.CMD_END,
          },
        },
        exitCode,
        running: false,
        failed: Boolean(exitCode),
      })
    : addToast({
        type: `error`,
        timeout: 6000,
        message: `Can not set testRun model running. A testRun model is required!`
      })


  toggleTestRunning(false)

}
