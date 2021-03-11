import { Values } from 'SVConstants'
import { isEmptyColl } from '@keg-hub/jsutils'
import { setActiveModal } from 'SVActions/modals'
import { setActiveSidebar } from 'SVActions/sidebar'
import { loadTestFile } from './files/api/loadTestFile'
import { loadBddTests } from './files/api/loadBddTests'
import { getQueryData } from 'SVUtils/helpers/getQueryData'
import { setScreenById } from 'SVActions/screens/setScreenById'
import { getRemoteFileTree } from './files/api/getRemoteFileTree'

const { MODAL_TYPES, SIDEBAR_TYPES, SCREENS } = Values


/**
 * Checks if an initial test file should be loaded, and makes call to load it
 * @function
 * @param {Object} queryObj - Current url query params as an object
 *
 * @return {void}
 */
const loadInitTestFiles = async (queryObj, screenId) => {
  // Load the file tree from root tests folder
  await getRemoteFileTree()

  // Load all features and definitions
  await loadBddTests()

  // Load the initial test file 
  queryObj?.file && await loadTestFile(queryObj?.file, screenId)
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
    setActiveModal(MODAL_TYPES.TEST_SELECTOR)
}

/**
 * Init action
 * executes on first app load
 * @function
 */
export const init = async () => {

  // Get the query params from the url
  const queryObj = getQueryData()

  // Load the initial screen
  const screenId = queryObj.screen || SCREENS.EDITOR
  setScreenById(screenId)

  // Load the initial test file
  await loadInitTestFiles(queryObj, screenId)

  // Setup the sidebar
  setActiveSidebar(SIDEBAR_TYPES.FILE_TREE)

  // Load the init modal
  loadInitModal(queryObj)
}