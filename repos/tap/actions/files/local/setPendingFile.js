import { getStore, dispatch } from 'SVStore'
import { setActiveFile } from './setActiveFile'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * sets the currently activeFile as an item in pendingFiles. given a valid pendingContent
 * @param {string} pendingContent - Modified content that's not saved
 * @param {Object} activeFile - The file with pending content
 * @param {string} screenId - Id of the screen the file is active on
 *
 * @returns {void}
 */
export const setPendingFile = (pendingContent, activeFile, screenId) => {
  // Update active file with the pending content
  activeFile &&
    screenId &&
    activeFile.modified !== pendingContent &&
    setActiveFile(activeFile, pendingContent, screenId)

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.PENDING_FILES,
      key: location || activeFile.location,
      item: activeFile,
    },
  })
}