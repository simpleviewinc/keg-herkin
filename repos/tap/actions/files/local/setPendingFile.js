import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * sets the currently activeFile as an item in pendingFiles. given a valid pendingContent
 * @param {string} pendingContent - Modified content that's not saved
 * @param {Object} activeFile - The file with pending content
 *
 * @returns {void}
 */
export const setPendingFile = (pendingContent, activeFile) => {
  activeFile && 
    activeFile?.content !== pendingContent &&
    dispatch({
      type: ActionTypes.SET_ITEM,
      payload: {
        category: CATEGORIES.PENDING_FILES,
        key: activeFile.location,
        item: pendingContent,
      },
    })
}