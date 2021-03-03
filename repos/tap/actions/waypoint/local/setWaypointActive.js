import { devLog } from 'SVUtils'
import { isObj } from '@keg-hub/jsutils'
import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { setActiveFile } from '../../files/local/setActiveFile'

/**
 * Sets a waypoint test active relative to a screen
 * @type function
 * @param {Object|string} waypoint - waypoint fileModel, name or location of the waypoint test
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 *
 * @returns {void}
 */
export const setWaypointActive = async (waypoint, screenId) => {
  // TODO
  setActiveFile(waypoint, screenId)
}
