import { addToast } from '../../toasts/addToast'
import { apiRequest } from 'SVUtils/api/apiRequest'
import { setDefinitions } from '../local/setDefinitions'

/**
 * Calls the API backend to load the parsed step definitions
 * Then calls setDefinitions, to add them to the Store
 * @type function
 *
 * @returns {void}
 */
export const getRemoteDefinitions = async () => {

  addToast({
    type: `info`,
    message: `Syncing step definitions with server!`,
  })

  const { definitions, definitionTypes } = await apiRequest(`/definitions`)

  ;(definitions || definitionTypes) &&
    setDefinitions(definitions, definitionTypes)
}