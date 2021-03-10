import { Values } from 'SVConstants'
import { setScreen } from 'SVActions/screens'
import { isEmptyColl } from '@keg-hub/jsutils'
import { setActiveModal } from 'SVActions/modals'
import { setActiveSidebar } from 'SVActions/sidebar'
import { loadTestFile } from './files/api/loadTestFile'
import { loadBddTests } from './files/api/loadBddTests'
import { getQueryData } from 'SVUtils/helpers/getQueryData'
import { getRemoteFileTree } from './files/api/getRemoteFileTree'

const { MODAL_TYPES, SIDEBAR_TYPES } = Values

/**
 * Checks if an initial screen should be set, and makes call to set it
 * @function
 * @param {Object} queryObj - Current url query params as an object
 *
 * @return {void}
 */
const loadInitScreen = async queryObj => {
  setScreen(queryObj.screen || 'empty')
}

/**
 * Checks if an initial test file should be loaded, and makes call to load it
 * @function
 * @param {Object} queryObj - Current url query params as an object
 *
 * @return {void}
 */
const loadInitTestFiles = async queryObj => {
  // Load the file tree from root tests folder
  await getRemoteFileTree()

  // Load all features and definitions
  await loadBddTests()

  // Load the initial test file 
  queryObj?.file && await loadTestFile(queryObj?.file)
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
  await loadInitScreen(queryObj)

  // Load the initial test file
  await loadInitTestFiles(queryObj)

  // Setup the sidebar
  setActiveSidebar(SIDEBAR_TYPES.FILE_TREE)

  // Load the init modal
  loadInitModal(queryObj)
}