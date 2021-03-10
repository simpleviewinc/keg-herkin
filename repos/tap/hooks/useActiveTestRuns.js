import { Values } from 'SVConstants'
import { noOpObj } from '@keg-hub/jsutils'
import { useActiveTestFile } from './useActiveTestFile'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

const { CATEGORIES } = Values

/**
 * Get the currently active test runs for the activeTestFile
 *
 * @returns {Object} - Found active test runs
 */
export const useActiveTestRuns = () => {
  const activeTestFile = useActiveTestFile()
  const allTestRuns = useStoreItems(CATEGORIES.TEST_RUNS) || noOpObj

  return activeTestFile.location &&
    allTestRuns[activeTestFile.location]
}