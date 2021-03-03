import { setActiveFile } from './setActiveFile'
import { setFeatureActive } from '../../features/local/setFeatureActive'
import { setDefinitionActive } from '../../definitions/local/setDefinitionActive'
import { setUnitActive } from '../../unit/local/setUnitActive'
import { setWaypointActive } from '../../waypoint/local/setWaypointActive'

/**
 * Calls the activeFile method for the fileModel based on the file type
 * @param {Object} fileModel - File model object to set active
 *
 * @returns {void}
 */
export const setActiveFileFromType = fileModel => {
  switch(fileModel.fileType){
    case 'definition':
      return setDefinitionActive(fileModel)
    case 'feature':
      return setFeatureActive(fileModel)
    case 'unit':
      return setUnitActive(fileModel)
    case 'waypoint':
      return setWaypointActive(fileModel)
    default:
      return setActiveFile(fileModel)
  }
}