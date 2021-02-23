import { apiRequest } from './apiRequest'
import { logData, isFunc } from '@keg-hub/jsutils'
import { Values } from 'SVConstants'

const { HttpMethods } = Values
/**
 * Helper to make file save requests to the Backend API
 * @function
 * @export
 * @public
 * @param {string} filePath - Path to the file to be saved on the backend
 * @param {string} content - Text content to save to the file
 * @param {function} [callback=undefined] - Callback function called after the request is made 
 *
 * @returns {*} - Response from the Backend API or callback function when it exists
 */
export const saveApiFile = async (filePath, content, callback) => {
  const response = filePath
    ? await apiRequest({
        method: HttpMethods.POST,
        url: `/files/save`,
        params: { path: filePath, content }
      })
    : logData(`Save File action requires a file path!`)

  return isFunc(callback) ? callback(response) : response
}