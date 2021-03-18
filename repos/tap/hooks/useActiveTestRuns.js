import { Values } from 'SVConstants'
import { noOpObj } from '@keg-hub/jsutils'
import { useActiveFile } from './useActiveFile'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { testRunModelMock } from '../mocks/testRunModelMock'

const { CATEGORIES } = Values

/**
 * Get the currently active test runs for the activeFile
 *
 * @returns {Object} - Found active test runs
 */
export const useActiveTestRuns = () => {
  const activeFile = useActiveFile()
  const allTestRuns = useStoreItems(CATEGORIES.TEST_RUNS) || noOpObj

  // Uncomment for testing the testRunModel without needing the command 
  // return testRunModelMock

  return activeFile.location &&
    allTestRuns[activeFile.location]
}