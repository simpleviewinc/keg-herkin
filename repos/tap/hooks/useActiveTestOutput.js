import { Values } from 'SVConstants'
import { useActiveTestFile } from './useActiveTestFile'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

const { CATEGORIES } = Values

export const useActiveTestOutput = () => {
  const activeTestFile = useActiveTestFile()
  const allFileOutput = useStoreItems(CATEGORIES.TEST_FILE_OUTPUT)

  return activeTestFile.location &&
    allFileOutput[activeTestFile.location]
}