import { useCallback } from 'react'
import { removePendingFile, setPendingFile } from 'SVActions/files/local'
import { getActiveFile } from 'SVUtils/helpers/getActiveFile'
import { getStore } from 'SVStore'
/**
 * Sets an active files pending content when it changes
 * @param {string=} screenId - Id of the screen the file is active on
 * @returns {function} - Callback to call when the activeFile content changes
 */
export const usePendingCallback = (screenId) => {
  // TODO Implement throttleLast to limit the amount of updates and improve performance
  return useCallback((text) => {

    // during a file switch, this cb is called with the old activeFile
    // this occurs prior to the 'activeFile' being passed down
    // in this case, we want to make sure activeFile is actually the current active file
    const curActiveFile = getActiveFile(getStore()?.getState()?.items)

    // Only do the update if we have everything we need
    if(!text || (!curActiveFile || !curActiveFile.content)) return

    text && text === curActiveFile.content
      ? removePendingFile(curActiveFile, screenId)
      : setPendingFile(text, curActiveFile, screenId)

  }, [screenId])
}