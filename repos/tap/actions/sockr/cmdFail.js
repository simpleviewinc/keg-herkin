import { addToast } from '../toasts/addToast'
import { get, noOpObj } from '@keg-hub/jsutils'
import { getStore } from 'SVStore'
import { setTestRun } from '../runner/setTestRun'
import { Values } from 'SVConstants'
import { getResultsActiveFile } from 'SVUtils/helpers/getResultsActiveFile'

const { CATEGORIES, SOCKR_MSG_TYPES } = Values

/**
 * Updates a testRunModel to be failed
 * @param {Object} data - Message data from the socket
 * @param {Object} testRunModel - The test run model to set running to false
 *
 * @returns {void}
 */
export const cmdFail = (data, testRunModel) => {
  const { items } = getStore().getState()
  const activeFile = getResultsActiveFile() || noOpObj
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, activeFile.location])

  testRunModel
    ? setTestRun({
        ...testRunModel,
        failed: true,
        messages: {
          ...testRunModel.messages,
          [data.timestamp]: {
            message: data.message || `Command failed!`,
            timestamp: data.timestamp,
            type: SOCKR_MSG_TYPES.CMD_FAIL,
          },
        },
      })
    : addToast({
        type: `error`,
        timeout: 6000,
        message: `Can not set testRun model failed. A testRun model is required!`
      })

}
