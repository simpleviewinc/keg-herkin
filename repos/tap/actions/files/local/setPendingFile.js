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

  // TODO: Remove this from this function
  // We should remove the modified property form the fileModel
  // Changes are stored in the pending_files store
  // All editors should pull from there, or form the activeFile.content
  // IMPORTANT - The only time the activeFile.content should be updated is when
  // The file is saved to the backend, and is successful
  // then the new saved content is set as the activeFile.content
  // Otherwise, all changed content is saved to the pending_files store
  // only set pending of the content and incoming change is different
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