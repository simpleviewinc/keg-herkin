
import { setScreen } from 'SVActions/setScreen'
import { saveApiFile } from 'SVUtils/api/saveApiFile'

export const createFeatureFile = async (screenId, fileName) => {
  setScreen(screenId)
  console.log('---creating new feature TBA----')
  // await saveApiFile(fileName)
}