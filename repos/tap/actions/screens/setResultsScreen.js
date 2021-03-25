import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { setScreen } from './setScreen'
import { isEmptyColl, exists } from '@keg-hub/jsutils'

const { CATEGORIES, SUB_CATEGORIES, SCREENS } = Values

/**
 * Gets the file to be used as the activeFile for the results screen
 * @type function
 * @param {Object} items - Redux store items
 *
 * @returns {Object} - Found fileModel to set as the active file for the results screen
 */
const getResultsFile = (activeFile, items, resultsScreen) => {
  const resultsFile = !isEmptyColl(activeFile)
    ? activeFile
    : !isEmptyColl(resultsScreen.activeFile)
      ? resultsScreen.activeFile
      : null

  if(exists(resultsFile)) return resultsFile

  // If no resultsFile then get the activeFile for the activeScreen of the results screen
  const activeScreen = Object.values(items[CATEGORIES.SCREENS])
    .find(screen => screen.active)

  // Get the activeFile from the activeScreen
  return activeScreen ? activeScreen[SUB_CATEGORIES.ACTIVE_FILE] : {}
}

/**
 * Special handling to use the active screens activeFile be set for the results screen
 * @type function
 * @param {Object} activeFile - File model of the active file
 * @param {Object} altFileModel - File model of the alt active file
 *
 * @returns {void}
 */
export const setResultsScreen = (activeFile, altFileModel) => {

  const { items } = getStore().getState()
  const resultsScreen = items[CATEGORIES.SCREENS][SCREENS.RESULTS]

  const screenModel = {
    ...resultsScreen,
    [SUB_CATEGORIES.ALT_ACTIVE_FILE]: altFileModel || false,
    [SUB_CATEGORIES.ACTIVE_FILE]: getResultsFile(activeFile, items, resultsScreen) || {},
  }

  setScreen(screenModel.id, screenModel)
}