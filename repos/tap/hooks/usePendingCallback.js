import { useCallback } from 'react'
import { removePendingFile, setPendingFile } from 'SVActions/files/local'

/**
 * Sets an active files pending content when it changes
 * @param {Object} activeFile - File to have it's pending content set
 * @param {string=} screenId - Id of the screen the file is active on
 * @returns {function} - Callback to call when the activeFile content changes
 */
export const usePendingCallback = (activeFile, screenId) => {
  return useCallback(text => {

    // Only do the update if we have everything we need
    if(!text || (!activeFile || !activeFile.content)) return

    text && text === activeFile.content
      ? removePendingFile(activeFile, screenId)
      : setPendingFile(text, activeFile, screenId)

  }, [activeFile, screenId])
}