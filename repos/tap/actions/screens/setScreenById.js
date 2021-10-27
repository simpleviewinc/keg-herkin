import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { setScreen } from './setScreen'
import { setResultsScreen } from './setResultsScreen'

const { CATEGORIES, SCREENS } = Values
const defFileProps = { activeFile: {}, altActiveFile: false }

/**
 * Sets the currently active screen based on the passed in ID
 * @param {string} screenId - Id of the active screen
 * @param {Object} [screenModel] - Model of the screen to set active overrides screenId
 *
 * @returns {void}
 */
export const setScreenById = (screenId, screenModel) => {
  const { items } = getStore().getState()
  screenModel = screenModel || items[CATEGORIES.SCREENS][screenId]

  return setScreen(screenId, screenModel)
}