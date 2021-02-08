
import { setScreen } from 'SVActions/setScreen'
import { saveFile } from 'SVActions/api/files/saveFile'

export const createFeatureFile = async (screenId, fileName) => {
  setScreen(screenId)
  console.log('---creating new feature TBA----')
  // await saveFile(fileName)
}