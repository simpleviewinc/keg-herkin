import { Values } from 'SVConstants'
import { setScreen } from 'SVActions/screens'
import { isEmptyColl } from '@keg-hub/jsutils'
import { upsertFileTree } from 'SVActions/files'
import { setActiveModal } from 'SVActions/modals'
import { apiRequest } from 'SVUtils/api/apiRequest'
import { setActiveSidebar } from 'SVActions/sidebar'
import { getQueryData } from 'SVUtils/helpers/getQueryData'

const { MODAL_TYPES, SIDEBAR_TYPES } = Values

/**
 * Checks if an initial screen should be set, and makes call to set it
 * @function
 * @param {Object} queryObj - Current url query params as an object
 *
 * @return {void}
 */
const loadInitScreen = async queryObj => {
  setScreen(queryObj.tab || 'empty')
}

/**
 * Checks if an initial test file should be loaded, and makes call to load it
 * @function
 * @param {Object} queryObj - Current url query params as an object
 *
 * @return {void}
 */
const loadInitTestFile = async queryObj => {
  if(activeFeat && activeFeat.content)
    return upsertActiveRunnerTest(activeFeat)

  const testFile = activeFeat && activeFeat.testPath || queryFile

  // load the file tree from root tests folder
  upsertFileTree(await apiRequest(`/files/tree`) || {})
}

/**
 * Checks if the initial settings modal should be shown, and makes call to update the store 
 * @function
 * @param {Object} queryObj - Current url query params as an object
 *
 * @return {void}
 */
const loadInitModal = async queryObj => {
  // display options modal if no valid querystring passed in
  ;(!queryObj || isEmptyColl(queryObj)) &&
    setActiveModal(MODAL_TYPES.TEST_SELECTOR_MODAL)
}

/**
 * Init action
 * executes on first app load
 * @function
 */
export const init = async () => {
  // Get the query params from the url
  const queryObj = getQueryData()

  // Load the initial test file
  await loadInitTestFile(queryObj)

  // Load the initial screen
  await loadInitScreen(queryObj)

  // Setup the sidebar
  setActiveSidebar(SIDEBAR_TYPES.FILE_TREE)

  // Load the init modal
  loadInitModal(queryObj)
}