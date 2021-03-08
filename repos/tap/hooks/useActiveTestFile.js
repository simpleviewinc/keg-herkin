import { Values } from 'SVConstants'
import { useMemo, useEffect } from 'react'
import { isEmptyColl } from '@keg-hub/jsutils'
import { useActiveFile } from './useActiveFile'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { setActiveTestFile } from 'SVActions/runner/setActiveTestFile'

const { CATEGORIES } = Values

/**
 * Hook to get the activeTestFile from the currently active screen
 * If no current active test file, and an active file exists, then
 * The activeFile is automatically set to be the activeTestFile
 * @function
 * @param {string} screenId - Id of the screen the file is active on
 *
 * @returns {Object} - Found active file
 */
export const useActiveTestFile = screenId => {
  const activeTestFile = useStoreItems(CATEGORIES.ACTIVE_TEST_FILE)
  const activeFile = useActiveFile(screenId)
  const testFile = useMemo(() => (activeTestFile || activeFile), [activeTestFile, activeFile])

  useEffect(() => {
    (!activeTestFile || isEmptyColl(activeTestFile)) &&
      !isEmptyColl(activeFile) &&
      setActiveTestFile(activeFile)
  }, [activeTestFile, activeFile, testFile])
  
  return testFile
} 