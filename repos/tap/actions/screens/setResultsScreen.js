import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { setScreen } from './setScreen'

const { CATEGORIES, SUB_CATEGORIES, SCREENS } = Values

/**
 * Gets the file to be used as the activeFile for the results screen
 * @type function
 * @param {Object} items - Redux store items
 *
 * @returns {Object} - Found fileModel to set as the active file for the results screen
 */
const getResultsFile = (items, resultsScreen) => {
  if(resultsScreen.activeFile) return resultsScreen.activeFile

  // If no resultsFile then get the activeFile for the activeScreen of the results screen
  const activeScreen = Object.values(items[CATEGORIES.SCREENS]).find(screen => screen.active)

  // Get the activeFile from the activeScreen
  return activeScreen && activeScreen[SUB_CATEGORIES.ACTIVE_FILE]
}

/**
 * Special handling to use the active screens activeFile be set for the results screen
 * @type function
 * @param {string} screenId - Id of the screen to make active
 *
 * @returns {void}
 */
export const setResultsScreen = activeFile => {
  const { items } = getStore().getState()
  const resultsScreen = items[CATEGORIES.SCREENS][SCREENS.RESULTS]
  const fileModel = activeFile || getResultsFile(items, resultsScreen)

  const screenModel = { ...resultsScreen }
  fileModel && (screenModel[SUB_CATEGORIES.ACTIVE_FILE] = fileModel)

  setScreen(screenModel.id, screenModel)

}