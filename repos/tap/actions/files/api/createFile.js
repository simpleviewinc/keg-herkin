import { devLog } from 'SVUtils'
import { Values } from 'SVConstants'
import { createApiFile } from 'SVUtils/api/createApiFile'
import { addToast } from 'SVActions/toasts'
import { noOpObj, get } from '@keg-hub/jsutils'

const { FILE_TYPES } = Values

/**
 * Checks the file extension based on fileType, and adds it if needed
 * @param {string} fileType - The type of file being checked
 * @param {string} fileName - Name of the file to check
 * 
 * @returns {string} - Update fileName with it's extension added
 */
const ensureExtension = (fileType, fileName) => {
  const ext = fileType === FILE_TYPES.FEATURE ? FILE_TYPES.FEATURE : 'js'
  if(!fileName.includes('.')) return `${fileName}.${ext}`

  const last = fileName.split('.').pop()

  return last === ext ? fileName : `${fileName}.${ext}`
}


/**
 * Creates a new file from the passed in fileModel
 * @param {string} fileType - The type of file being created
 * @param {string} fileName - Name of the file to create
 * 
 * @returns {Object} - {success, fileModel}
 */
export const createFile = async (fileType, fileName) => {
  const file = ensureExtension(fileType, fileName)

  if (!file)
    return addToast({ type: `warn`, message: 'File name is required to create a new file'})

  addToast({
    type: 'info',
    message: `Creating new file ${file}!`
  })

  const result = await createApiFile(file, fileType)
  const { success, file:filModel, error } = result 

  if(success){
    addToast({
      type: 'success',
      message: `New file ${filModel.name} was created!`
    })
  }
  else {
    const message = get(result, 'error.message', `Failed to create new file ${fileName}!`)
    addToast({ type: 'danger', message })
  }

  return result

}