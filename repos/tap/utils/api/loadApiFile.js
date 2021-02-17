import { apiRequest } from './apiRequest'
import { logData, isFunc } from '@keg-hub/jsutils'

/**
 * Helper to make file load requests to the Backend API
 * @function
 * @export
 * @public
 * @param {string} path - Path to the file to be loaded on the backend
 * @param {function} [callback=undefined] - Callback function called after the request is made
 *
 * @returns {*} - Response from the Backend API or callback function when it exists
 */
export const loadApiFile = async (path, callback) => {
  const response = path
    ? await apiRequest(`/files/load?path=${path}`)
    : logData(`Load File action requires a file path!`)

  return isFunc(callback) ? callback(response) : response
}