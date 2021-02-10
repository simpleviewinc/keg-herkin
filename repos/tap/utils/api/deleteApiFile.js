import { apiRequest } from './apiRequest'
import { logData, isFunc } from '@keg-hub/jsutils'

/**
 * Helper to make file delete requests to the Backend API
 * @function
 * @export
 * @public
 * @param {string} file - Path to the file to be deleted on the backend
 * @param {function} [callback=undefined] - Callback function called after the request is made 
 *
 * @returns {*} - Response from the Backend API or callback function when it exists
 */
export const deleteApiFile = async (file, callback) => {
  const response = file
    ? await apiRequest({
        method: 'delete',
        url: `/files/delete`,
        params: { file },
      })
    : logData(`Delete File action requires a file path!`)

  return isFunc(callback) ? callback(response) : response
}