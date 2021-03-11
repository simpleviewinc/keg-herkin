import { networkRequest } from 'SVServices/networkRequest'
import { isObj } from '@keg-hub/jsutils'
import { devLog } from 'SVUtils'
import { getBaseApiUrl } from './getBaseApiUrl'
/**
 * Default arguments for an API request
 * @object
 */
const defRequest = {
  url: getBaseApiUrl()
}

/**
 * Helper to make api requests to the Backend API
 * @function
 * @export
 * @public
 * @param {Object} request - Arguments that define the request type to make
 * @param {string|boolean} responseType - Type of response returned on error. default is false
 *
 * @returns {Object|Boolean} - Data returned from the Backend API
 */
export const apiRequest = async (request, responseType) => {
  const builtRequest = isObj(request)
    ? request
    : { url: request }

  builtRequest.url = builtRequest.url.indexOf('/') !== 0
    ? builtRequest.url
    : `${defRequest.url}${builtRequest.url}`

  const { data, success } = await networkRequest({
    ...defRequest,
    ...builtRequest,
  })

  if (success)  return isObj(data) && data.data || data

  devLog(`warn`, `ERROR: ${data?.error?.message}`)
  return responseType === 'object'
    ? data
    : false

}