import { Values } from 'SVConstants'
import { noOpObj } from '@keg-hub/jsutils'
import { useActiveTestFile } from './useActiveTestFile'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

const { CATEGORIES } = Values

export const useActiveTestRuns = () => {
  const activeTestFile = useActiveTestFile()
  const allTestRuns = useStoreItems(CATEGORIES.TEST_RUNS) || noOpObj

  return activeTestFile.location &&
    allTestRuns[activeTestFile.location]
}