import { getStore, dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Removes the key item from pendingFiles store
 * @param {string} location 
 */
export const removePendingFile = (location) => {
  const { items } = getStore().getState()
  const { activeFile } = items

  dispatch({
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      category: CATEGORIES.PENDING_FILES,
      key: location || activeFile.location,
    },
  })

  return true
}