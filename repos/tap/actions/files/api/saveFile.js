import { devLog } from 'SVUtils'
import { saveApiFile } from 'SVUtils/api'
import { addToast } from 'SVActions/toasts'
import { noOpObj } from '@keg-hub/jsutils'
import { removePendingFile } from '../local/removePendingFile'

/**
 * Save the content to the given file. if no filePath passed in. it will save it on the currently active file
 * @param {Object} fileToSave - fileModel to be saved on the backend
 *
 * @returns {Object} - {success, fileModel}
 */
export const saveFile = async (fileToSave=noOpObj, showToast=true) => {
  const { location, content } = fileToSave

  if (!content || !location)
    return devLog(`warn`, 'File content and location are required')

  showToast &&
    addToast({
      type: 'info',
      message: `Saving file ${fileToSave.name}!`
    })

  const result = await saveApiFile(location, content)

  if(result?.success){
    removePendingFile(fileToSave)
    showToast &&
      addToast({
        type: 'success',
        message: `File ${fileToSave.name} was saved!`
      })
  }
  else showToast &&
    addToast({
      type: 'danger',
      message: `Failed to save file ${fileToSave.name}!`
    })
  
  return result
}