import { useMemo, useCallback } from 'react'
import { deepMerge, isEmpty, exists } from '@keg-hub/jsutils'
import { setScreenById } from 'SVActions/screens/setScreenById'

/**
 * Gets the activeFile for the new screen
 * By using the passed in switchFile if it exists, or using the current screens activeFile
 * @param {Object} switchFile - Active file of the screen being set to active
 * @param {Object} currentFile - Active file of the current screen
 *
 * @return {Object} - Active file to use for the screen being switched to
 */
const getScreenFile = (switchFile, currentFile) => {
  return exists(currentFile) &&
    (!exists(switchFile) || isEmpty(switchFile)) &&
    currentFile
}

/**
 * Hook that creates a callback that's called when a tab is selected
 * Gets the tab that was selected, and calls setScreenById action to set it active
 * Also checks if it has a active files, and if not uses the current screens active files 
 * @type function
 * @param {Object} screenTab - Currently active Screen Tab
 * @param {Object} screenModels - All screen models from the Redux Store referenced by Screen ID
 *
 * @returns {function} - To be called when a screen tab is selected
 */
export const useScreenSelect = (screenTab, screenModels) => {
  return useCallback(screenId => {
    const switchScreen = screenModels[screenId]
    if(screenId === screenTab?.id || !switchScreen) return

    const currentScreen = screenModels[screenTab?.id]

    // Get the activeFiles to use for the switched to screen
    // If no active file is set, it uses the current screens activeFiles
    const activeFile = getScreenFile(
      switchScreen.activeFile,
      screenTab.activeFile
    )
    const altActiveFile = getScreenFile(
      switchScreen.altActiveFile,
      screenTab.altActiveFile
    )

    // Call action to update the Redux store with the new active screen
    setScreenById(screenId, deepMerge(
      switchScreen,
      (activeFile && { activeFile }),
      (altActiveFile && { altActiveFile })
    ))

    return true
  }, [screenTab, screenModels])
}
