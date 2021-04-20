import { Values } from 'SVConstants'
import { saveFile } from '../api/saveFile'
import { setActiveFileFromType } from './setActiveFileFromType'
const { SCREENS } = Values

/**
 * Helper to save the file and updates the activeFile and file store
 * @param {string} content - text content of the file
 * @param {object} activeFile - fileModel object of the file with pending content
 *
 * @returns {boolean} - True if save was successful
 */
export const savePendingContent = async (content, activeFile) => {
  // save the file and update active file
  const saveResult = content && await saveFile({ ...activeFile, content })
  if(!saveResult || !saveResult.success) return false
  
  await setActiveFileFromType(saveResult?.file, SCREENS.EDITOR)

  return true
}
