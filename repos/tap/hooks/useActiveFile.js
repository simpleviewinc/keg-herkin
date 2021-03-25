import { useMemo } from 'react'
import { Values, ActionTypes } from 'SVConstants'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Hook to get the activeFile from the currently active screen
 * @function
 * @param {string} screenId - Id of the screen the file is active on
 *
 * @returns {Object} - Found active file
 */
export const useActiveFile = screenId => {
  const screenModels = useStoreItems(CATEGORIES.SCREENS)

  return useMemo(() => {
    return screenId
      ? screenModels[screenId][SUB_CATEGORIES.ACTIVE_FILE]
      : Object.values(screenModels)
          .reduce((found, model) => (
            found || model.active && model[SUB_CATEGORIES.ACTIVE_FILE]
          ), false)
  }, [screenModels, screenId])
} 