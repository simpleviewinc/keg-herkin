import { apiRequest } from 'SVUtils/apiRequest'
import { logData, isFunc } from '@keg-hub/jsutils'

export const deleteFile = async (file, callback) => {
  const response = file
    ? await apiRequest({
        method: 'delete'
        url: `/files/delete`,
        params: { file },
      })
    : logData(`Delete File action requires a file path!`)

  return isFunc(callback) ? callback(response) : response
}