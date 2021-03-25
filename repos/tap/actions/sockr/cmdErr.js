import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { addToast } from '../toasts/addToast'
import { get, noOpObj } from '@keg-hub/jsutils'
import { setTestRun } from '../runner/setTestRun'
import { getResultsActiveFile } from 'SVUtils/helpers/getResultsActiveFile'

const { CATEGORIES, SOCKR_MSG_TYPES } = Values

/**
 * Updates the messages object of the active testRunModel with a stderr message
 * @param {Object} data - Message data from the socket
 * @param {Object} testRunModel - The test run model to update
 *
 * @returns {void}
 */
export const cmdErr = (data, testRunModel) => {
  const { items } = getStore().getState()
  const activeFile = getResultsActiveFile() || noOpObj
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, activeFile.location])

  testRunModel
    ? setTestRun({
        ...testRunModel,
        messages: {
          ...testRunModel.messages,
          [data.timestamp]: {
            message: data.message,
            timestamp: data.timestamp,
            type: SOCKR_MSG_TYPES.STD_ERR,
          },
        }
      })
    : addToast({
        type: `error`,
        timeout: 6000,
        message: `Can not set testRun message. A testRun model is required!`,
      })
    

}
