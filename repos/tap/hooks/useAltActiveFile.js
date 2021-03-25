import { useMemo, useEffect } from 'react'
import { Values, ActionTypes } from 'SVConstants'
import { clearAltActiveFile } from 'SVActions/files/local/clearAltActiveFile'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Hook to get the active alt file from the currently active screen
 * @function
 * @param {string} screenId - Id of the screen the file is active on
 *
 * @returns {Object} - Found active alt file
 */
export const useAltActiveFile = (screenId, type) => {
  const screenModels = useStoreItems(CATEGORIES.SCREENS)

  return useMemo(() => {
    const altActiveFile = screenId
      ? screenModels[screenId][SUB_CATEGORIES.ALT_ACTIVE_FILE]
      : Object.values(screenModels)
          .reduce((found, model) => (
            found || (model.active && model[SUB_CATEGORIES.ACTIVE_DEFINITION])
          ), false)

      return (!type || altActiveFile?.fileType === type)
        ? altActiveFile
        : false
  }, [screenModels, screenId])

  useEffect(() => {
    type &&
      altActiveFile?.fileType !== type &&
      clearAltActiveFile(screenId)
  }, [altActiveFile, type])


} 