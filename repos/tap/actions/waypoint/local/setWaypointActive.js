import { devLog } from 'SVUtils'
import { isObj } from '@keg-hub/jsutils'
import { getStore, dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { setActiveFile } from '../../files/local/setActiveFile'
const { CATEGORIES } = Values

/**
 * Sets a waypoint test active relative to a screen
 * @type function
 * @param {Object} waypoint - waypoint fileModel
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 *
 * @returns {void}
 */
export const setWaypointActive = async (waypoint, screenId) => {
  waypoint && dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.WAYPOINTS,
      key: waypoint?.location,
      item: waypoint,
    },
  })

  setActiveFile(waypoint, screenId)
}
