import { devLog } from 'SVUtils'
import { get } from '@keg-hub/jsutils'
import { getStore } from 'SVStore'
import { setTestRun } from '../runner/setTestRun'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Updates a testRunModel to no longer be running
 * @param {Object} data - Message data from the socket
 * @param {Object} testRunModel - The test run model to set running to false
 *
 * @returns {void}
 */
export const cmdEnd = (data, testRunModel) => {
  const { items } = getStore().getState()
  const { location } = get(items, CATEGORIES.ACTIVE_TEST_FILE, {})
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, location])

  testRunModel
    ? setTestRun({ ...testRunModel, running: false })
    : devLog(`error`, `Can not set testRun model running. A testRun model is required!`)

}
