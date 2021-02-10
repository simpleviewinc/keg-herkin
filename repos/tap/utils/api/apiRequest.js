import { networkRequest } from 'SVServices/networkRequest'
import { isObj } from '@keg-hub/jsutils'
import { getConfig } from '../getConfig'
const config = getConfig()

const defRequest = {
  url: `http://${ config.server.host }:${ config.server.port || ''}`
}

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