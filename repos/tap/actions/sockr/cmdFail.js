import { devLog } from 'SVUtils'
import { get } from '@keg-hub/jsutils'
import { getStore } from 'SVStore'
import { setTestRun } from '../runner/setTestRun'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Updates a testRunModel to be failed
 * @param {Object} data - Message data from the socket
 * @param {Object} testRunModel - The test run model to set running to false
 *
 * @returns {void}
 */
export const cmdFail = (data, testRunModel) => {
  const { items } = getStore().getState()
  const { location } = get(items, CATEGORIES.ACTIVE_TEST_FILE, {})
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, location])

  testRunModel
    ? setTestRun({ ...testRunModel, failed: true })
    : devLog(`error`, `Can not set testRun model failed. A testRun model is required!`)

}
