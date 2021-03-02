import { setActiveFile } from './setActiveFile'
import { setFeatureActive } from '../../features/local/setFeatureActive'
import { setDefinitionActive } from '../../definitions/local/setDefinitionActive'

export const setActiveFileFromType = fileModel => {
  switch(fileModel.fileType){
    case 'feature':
      return setFeatureActive(fileModel)
    case 'definition':
      return setDefinitionActive(fileModel)
    default:
      return setActiveFile(fileModel)
  }
}