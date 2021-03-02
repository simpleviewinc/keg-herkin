import { getStore, dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * sets the currently activeFile as an item in pendingFiles. given a valid pendingContent
 * @param {string} pendingContent 
 * @param {string} location 
 */
export const setPendingFile = (pendingContent, location) => {
  const { items } = getStore().getState()
  const { activeFile } = items
  activeFile.modified = pendingContent
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.PENDING_FILES,
      key: location || activeFile.location,
      item: activeFile,
    },
  })
}