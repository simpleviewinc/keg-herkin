import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { setScreen } from './setScreen'
import { setResultsScreen } from './setResultsScreen'

const { SCREENS } = Values

/**
 * Sets the currently active screen based on the passed in ID
 * @param {string} screenId - Id of the active screen
 * @param {Object} [screenModel] - Model of the screen to set active overrides screenId
 *
 * @returns {void}
 */
export const setScreenById = (screenId, screenModel) => {
  screenId === SCREENS.RESULTS
    ? setResultsScreen(screenModel && screenModel.activeFile)
    : setScreen(screenId, screenModel)
}