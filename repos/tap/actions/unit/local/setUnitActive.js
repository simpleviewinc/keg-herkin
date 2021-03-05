import { devLog } from 'SVUtils'
import { isObj } from '@keg-hub/jsutils'
import { getStore, dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { setActiveFile } from '../../files/local/setActiveFile'
const { CATEGORIES } = Values

/**
 * Sets a unit test active relative to a screen
 * @type function
 * @param {Object} unit - Unit fileModel
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 *
 * @returns {void}
 */
export const setUnitActive = async (unit, screenId) => {
  unit && dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.UNITS,
      key: unit?.location,
      item: waypoint,
    },
  })
  setActiveFile(unit, screenId)
}
