import { apiRequest } from './apiRequest'
import { logData, isFunc } from '@keg-hub/jsutils'
import { Values } from 'SVConstants'

const { HttpMethods } = Values
/**
 * Helper to make file create requests to the Backend API
 * @function
 * @export
 * @public
 * @param {string} fileName - Name of the file to be saved
 * @param {string} fileType - Test Type of of the file
 * @param {function} [callback=undefined] - Callback function called after the request is made 
 *
 * @returns {*} - Response from the Backend API or callback function when it exists
 */
export const createApiFile = async (fileName, fileType, callback) => {
  const response = fileName
    ? await apiRequest({
        method: HttpMethods.POST,
        url: `/files/create`,
        params: { name: fileName, type: fileType }
      })
    : logData(`Create File action requires a file name!`)

  return isFunc(callback) ? callback(response) : response
}