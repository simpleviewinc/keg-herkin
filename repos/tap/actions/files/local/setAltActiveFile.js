import { get } from '@keg-hub/jsutils'
import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { getActiveScreen } from 'SVUtils/helpers/getActiveScreen'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Sets a alternate file active relative to the current active file and screen
 * @type function
 * @param {Object} fileModel - alternate fileModel to set active
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 *
 * @returns {void}
 */
export const setAltActiveFile = (fileModel, screenId) => {
  const { items } = getStore().getState()
  const screenModel = getActiveScreen(items, screenId)

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.SCREENS,
      key: screenModel.id,
      item: {
        ...screenModel,
        [SUB_CATEGORIES.ALT_ACTIVE_FILE]: { ...fileModel },
      },
    },
  })
}