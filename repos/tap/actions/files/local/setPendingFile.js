import { getStore, dispatch } from 'SVStore'
import { setActiveFile } from './setActiveFile'
import { Values, ActionTypes } from 'SVConstants'
import { getActiveFile } from 'SVUtils/helpers/getActiveFile'

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

  // TODO: Remove this from this function
  // We should remove the modified property form the fileModel
  // Changes are stored in the pending_files store
  // All editors should pull from there, or form the activeFile.content
  // IMPORTANT - The only time the activeFile.content should be updated is when
  // The file is saved to the backend, and is successful
  // then the new saved content is set as the activeFile.content
  // Otherwise, all changed content is saved to the pending_files store
  
  // this should be removed once, the modified property no longer exists
  const curActiveFile = getActiveFile(getStore()?.getState()?.items)
  const isCurrent = curActiveFile?.location === activeFile?.location
  const shouldBeActive = (activeFile && screenId && activeFile.modified !== pendingContent)
  
  // Update active file with the pending content
  const updatedFile = shouldBeActive && isCurrent
    ? setActiveFile(activeFile, pendingContent, screenId)
    : activeFile

  updatedFile !== activeFile &&
    dispatch({
      type: ActionTypes.SET_ITEM,
      payload: {
        category: CATEGORIES.PENDING_FILES,
        key: updatedFile.location,
        // this should only be the content, and not the entire file model
        item: updatedFile,
      },
    })
}