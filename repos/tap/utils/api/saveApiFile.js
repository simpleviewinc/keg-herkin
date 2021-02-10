import { apiRequest } from './apiRequest'
import { logData, isFunc } from '@keg-hub/jsutils'

export const saveApiFile = async (file, content, callback) => {
  const response = file
    ? await apiRequest({
        method: 'post',
        url: `/files/save`,
        params: { file, content }
      })
    : logData(`Save File action requires a file path!`)

  return isFunc(callback) ? callback(response) : response
}