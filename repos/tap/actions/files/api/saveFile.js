import { devLog } from 'SVUtils'
import { dispatch, getStore } from 'SVStore'
import { saveApiFile } from 'SVUtils/api'
import { noOpObj } from '@keg-hub/jsutils'
import { removePendingFile } from '../local/removePendingFile'

/**
 * Save the content to the given file. if no filePath passed in. it will save it on the currently active file
 * @param {Object} fileToSave - fileModel to be saved on the backend
 * @param {string} screenId - Id of the screen the file is active on
 * 
 * @returns {boolean} - False if the file was NOT saved
 */
export const saveFile = async (fileToSave=noOpObj, screenId) => {
  const { location, content } = fileToSave

  if (!content || !location)
    return devLog(`warn`, 'File content and location are required')

  const result = await saveApiFile(location, content)

  return result?.success
    ? removePendingFile(fileToSave, screenId)
    : false

}