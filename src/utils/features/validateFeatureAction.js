import { devLog } from '../devLog'
import { getStore } from 'SVStore'

const emptyObj = {}

const emptyResponse = (message, ...extra) => {
  devLog(`warn`, message, ...extra)
  return emptyObj
}

export const validateFeatureAction = (feature, type) => {
  if(!feature || !feature[type])
    return emptyResponse(`The ${type} does not exist on the feature.`, feature, type)

  const { items } = getStore()?.getState()
  if(!items || !items.features)
    return emptyResponse(`No features exist in the store!`, items)

  const { features } = items
  const index = features.findIndex(feat => feat.feature === feature.feature)
  if(index === -1) return emptyResponse(`Parent does not exist in the items store!`, items)

  return {
    items,
    index,
    feature,
    features,
  }

}