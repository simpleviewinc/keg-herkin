import { Values } from 'SVConstants'
import { saveFile } from '../api/saveFile'
import { setActiveFileFromType } from './setActiveFileFromType'
const { SCREENS } = Values

/**
 * Helper to save the file and updates the activeFile and file store
 * @param {string} content - text content of the file
 * @param {object} activeFile - fileModel object of the file with pending content
 * @param {boolean} [showToast=true] - Should show toast messages
 * 
 * @returns {boolean} - True if save was successful
 */
export const savePendingContent = async (content, activeFile, showToast=true) => {
  // save the file and update active file
  const saveResult = content && await saveFile({ ...activeFile, content }, showToast)
  if(!saveResult || !saveResult.success) return false
  
  await setActiveFileFromType(saveResult?.file, SCREENS.EDITOR)

  return true
}
