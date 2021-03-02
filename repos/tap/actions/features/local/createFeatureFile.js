
import { setScreen } from 'SVActions/screens/setScreen'
import { saveApiFile } from 'SVUtils/api/saveApiFile'

/**
 * Creates a new feature file using the filesModel
 * @type function
 * @param {string} screenId - Id of the screen to set the created file as the activeFile
 * @param {string} name - Name of the new feature file
 *
 * @returns {void}
 */
export const createFeatureFile = async (screenId, name) => {
  setScreen(screenId)
  console.log('---creating new feature TBA----')
  // await saveApiFile(name)
}