import { Values } from 'SVConstants'
import { getQueryData } from './getQueryData'
import { setActiveModal } from 'SVActions/modals'
import { isEmptyColl, noOpObj } from '@keg-hub/jsutils'
import { loadTestFile } from 'SVActions/files/api/loadTestFile'
import { setScreenById } from 'SVActions/screens/setScreenById'

const { MODAL_TYPES, SCREENS } = Values

/**
 * The current popstate
 * @boolean
 */
let IN_POP_STATE = false

/**
 * Handler for window.popstate events
 * Updates the redux store based on the updated url params
 * @function
 * @public
 * @export
 * @param {Object} event - Window pop state event
 *
 * @return {void}
 */
const listenToPopState = async event => {
  IN_POP_STATE = true
  // Get the query params from the url
  const queryObj = (getQueryData() || noOpObj)

  const { screen, file } = queryObj

  screen && setScreenById(screen)
  file && await loadTestFile(file, screen)

  // Load the init modal
  // display options modal if no valid querystring passed in
  isEmptyColl(queryObj) &&
    setActiveModal(MODAL_TYPES.TEST_SELECTOR)

  IN_POP_STATE = false
}

window.addEventListener('popstate', listenToPopState)

/**
 * Helper to know when the updates are coming form a pop-state update
 * @function
 * @public
 * @export
 *
 * @return {boolean} - The current popstate
 */
export const inPopStateUpdate = () => IN_POP_STATE