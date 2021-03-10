import { Values } from 'SVConstants'
import { setActiveFile } from './setActiveFile'
import { setFeatureActive } from '../../features/local/setFeatureActive'
import { setDefinitionActive } from '../../definitions/local/setDefinitionActive'
import { setUnitActive } from '../../unit/local/setUnitActive'
import { setWaypointActive } from '../../waypoint/local/setWaypointActive'

const { FILE_TYPES } = Values

/**
 * Calls the activeFile method for the fileModel based on the file type
 * @param {Object} fileModel - File model object to set active
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 * 
 * @returns {void}
 */
export const setActiveFileFromType = (fileModel, screenId) => {
  switch(fileModel.fileType){
    case FILE_TYPES.DEFINITION:
      return setDefinitionActive(fileModel, screenId)
    case FILE_TYPES.FEATURE:
      return setFeatureActive(fileModel, screenId)
    case FILE_TYPES.UNIT:
      return setUnitActive(fileModel, screenId)
    case FILE_TYPES.WAYPOINT:
      return setWaypointActive(fileModel, screenId)
    default:
      return setActiveFile(fileModel, screenId)
  }
}