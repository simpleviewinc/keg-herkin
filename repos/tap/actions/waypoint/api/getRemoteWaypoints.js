import { apiRequest } from 'SVUtils/api/apiRequest'
import { upsertWaypoints } from '../local/upsertWaypoints'

/**
 * Calls the API backend to load the parsed unit tests files
 * Then calls upsertWaypoint, to add them to the Store
 * @type function
 *
 * @returns {void}
 */
export const getRemoteWaypoints = async () => {
  const waypoints = await apiRequest(`/waypoints`)
  upsertWaypoint(waypoints)
}