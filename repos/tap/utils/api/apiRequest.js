import { networkRequest } from 'SVServices/networkRequest'
import { isObj } from '@keg-hub/jsutils'

/**
 * Default arguments for an API request
 * @object
 */
const defRequest = {
  url: `http://${ process.env.SERVER_HOST }:${ process.env.SERVER_PORT }`
}

/**
 * Helper to make api requests to the Backend API
 * @function
 * @export
 * @public
 * @param {Object} request - Arguments that define the request type to make
 *
 * @returns {Array} - Data returned from the Backend API
 */
export const apiRequest = async request => {
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

  return success
    ? isObj(data) && data.data || data
    : []
}