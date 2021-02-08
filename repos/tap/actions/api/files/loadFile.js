import { apiRequest } from 'SVUtils/apiRequest'
import { logData, isFunc } from '@keg-hub/jsutils'

export const loadFile = async (file, callback) => {
  const response = file
    ? await apiRequest(`/files/load?file=${file}`)
    : logData(`Load File action requires a file path!`)

  return isFunc(callback) ? callback(response) : response
}