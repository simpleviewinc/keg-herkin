import { apiRequest } from './apiRequest'
import { logData, isFunc } from '@keg-hub/jsutils'

export const loadApiFile = async (file, callback) => {
  const response = file
    ? await apiRequest(`/files/load?file=${file}`)
    : logData(`Load File action requires a file path!`)

  return isFunc(callback) ? callback(response) : response
}