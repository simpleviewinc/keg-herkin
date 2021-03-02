import { apiRequest } from 'SVUtils/api/apiRequest'
import { upsertDefinitions } from '../local/upsertDefinitions'

/**
 * Calls the API backend to load the parsed step definitions
 * Then calls upsertDefinitions, to add them to the Store
 * @type function
 *
 * @returns {void}
 */
export const getRemoteDefinitions = async () => {
  const definitions = await apiRequest(`/definitions`)
  definitions && upsertDefinitions(definitions)
}