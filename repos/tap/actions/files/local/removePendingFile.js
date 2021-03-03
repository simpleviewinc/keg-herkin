import { getStore, dispatch } from 'SVStore'
import { setActiveFile } from './setActiveFile'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Removes the key item from pendingFiles store
 * @param {Object} activeFile - The currently active file of the active screen
 * @param {string} screenId - Id of the screen the file is active on
 */
export const removePendingFile = (activeFile, screenId) => {

  // Update active file to not be modified
  activeFile &&
    screenId &&
    activeFile.modified &&
    setActiveFile({ ...activeFile, modified: false }, false, screenId)

  dispatch({
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      category: CATEGORIES.PENDING_FILES,
      key: activeFile.location,
    },
  })
}