import { setActiveFile } from './setActiveFile'
import { setFeatureActive } from '../../features/local/setFeatureActive'
import { setDefinitionActive } from '../../definitions/local/setDefinitionActive'
import { setUnitActive } from '../../unit/local/setUnitActive'
import { setWaypointActive } from '../../waypoint/local/setWaypointActive'

/**
 * Calls the activeFile method for the fileModel based on the file type
 * @param {Object} fileModel - File model object to set active
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 * 
 * @returns {void}
 */
export const setActiveFileFromType = (fileModel, screenId) => {
  switch(fileModel.fileType){
    case 'definition':
      return setDefinitionActive(fileModel, screenId)
    case 'feature':
      return setFeatureActive(fileModel, screenId)
    case 'unit':
      return setUnitActive(fileModel, screenId)
    case 'waypoint':
      return setWaypointActive(fileModel, screenId)
    default:
      return setActiveFile(fileModel, screenId)
  }
}