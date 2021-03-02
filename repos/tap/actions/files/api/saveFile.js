import { getStore } from 'SVStore'
import { devLog } from 'SVUtils'

import { saveApiFile } from 'SVUtils/api'


/**
 * Save the content to the given file. if no filePath passed in. it will save it on the currently active file
 * @param {Object} props
 * @param {Object} props.filePath
 * @param {Object} props.content
 * 
 * @returns {Object} - api response { location, name, success }
 */
export const saveFile = async ({filePath, content}) => {
  if (!content) return devLog(`warn`, 'Content is required')

  const { items } = getStore().getState()
  const path = filePath || items?.activeFile?.location

  return await saveApiFile(path, content)
}