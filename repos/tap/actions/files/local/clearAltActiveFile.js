import { get } from '@keg-hub/jsutils'
import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { getActiveScreen } from 'SVUtils/helpers/getActiveScreen'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Clears a currently set alternate active fileModel
 * @type function
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 *
 * @returns {void}
 */
export const clearAltActiveFile = screenId => {
  const { items } = getStore().getState()
  const screenModel = getActiveScreen(items, screenId)

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.SCREENS,
      key: screenModel.id,
      item: {
        ...screenModel,
        [SUB_CATEGORIES.ALT_ACTIVE_FILE]: false,
      },
    },
  })
}