import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { devLog } from 'SVUtils'

import { saveApiFile } from 'SVUtils/api'

const { CATEGORIES } = Values


export const saveFile = async ({filePath, content}) => {
  if (!content) return devLog(`warn`, 'Content is required')

  const { items } = getStore().getState()
  const path = filePath || items?.activeFile?.fullPath
  const response = await saveApiFile(path, content)
  console.log(response, 'response')
}