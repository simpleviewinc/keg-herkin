import { devLog } from 'SVUtils'
import { isObj } from '@keg-hub/jsutils'
import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { setActiveFile } from '../../files/local/setActiveFile'

/**
 * Sets a unit test active relative to a screen
 * @type function
 * @param {Object|string} unit - Unit fileModel, name or location of the unit test
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 *
 * @returns {void}
 */
export const setUnitActive = async (unit, screenId) => {
  // TODO
  setActiveFile(unit, screenId)
}
