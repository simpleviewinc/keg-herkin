import { apiRequest } from 'SVUtils/api/apiRequest'
import { upsertUnits } from '../local/upsertUnits'

/**
 * Calls the API backend to load the parsed unit tests files
 * Then calls upsertUnits, to add them to the Store
 * @type function
 *
 * @returns {void}
 */
export const getRemoteUnits = async () => {
  const units = await apiRequest(`/units`)
  upsertUnits(units)
}