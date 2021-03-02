import { setActiveFile } from './setActiveFile'
import { setFeatureActive } from '../../features/local/setFeatureActive'
import { setDefinitionActive } from '../../definitions/local/setDefinitionActive'

export const setActiveFileFromType = fileModel => {
  console.log(fileModel,'fileMOdel')
  switch(fileModel.fileType){
    case 'feature':
      return setFeatureActive(fileModel)
    case 'definition':
      return setDefinitionActive(fileModel)
    case 'waypoint':
      return setActiveFile(fileModel) // TODO
    case 'unit':
      return setActiveFile(fileModel) // TODO
    default:
      return setActiveFile(fileModel)
  }
}