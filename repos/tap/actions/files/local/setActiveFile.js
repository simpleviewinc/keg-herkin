import { devLog } from 'SVUtils'
import { get } from '@keg-hub/jsutils'
import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { getActiveScreen } from 'SVUtils/helpers/getActiveScreen'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Gets the screen to be updated based on the passed in screen id or the currently active screen
 * @param {string} screenId - Id of the screen to find
 *
 * @return {Object} - Found active screen model
 */
const getScreen = screenId => {
  const { items } = getStore().getState()
  return screenId && get(items, [CATEGORIES.SCREENS, screenId]) || getActiveScreen(items)
}

/**
 * setActiveFile
 * @param {Object} fileModel - file to set as the activeFile 
 */
export const setActiveFile = (fileModel, screenId) => {
  const screenModel = getScreen(screenId)
  if(!screenModel) return devLog(`error`, `Can not find screen from id`, screenId)
  const updatedFile = { ...fileModel }

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.SCREENS,
      key: screenModel.id,
      item: {
        ...screenModel,
        [SUB_CATEGORIES.ACTIVE_FILE]: updatedFile,
      },
    },
  })

  return updatedFile
}


