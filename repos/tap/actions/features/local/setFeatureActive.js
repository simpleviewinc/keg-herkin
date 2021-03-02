import { devLog } from 'SVUtils'
import { isObj } from '@keg-hub/jsutils'
import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { setActiveFile } from '../../files/local/setActiveFile'

const { CATEGORIES } = Values

const getFeatureFromName = (feature, location) => {
  const { items } = getStore()?.getState()
  if(!items || !items.features)
    return devLog(`warn`, `No features exist in the store!`, items)

  return items.features.find(feat => (
    feat === feature ||
      (feat.location === location || feat.location === feature) ||
      feat.name === feature
  ))
}

export const setFeatureActive = async feature => {
  const activeFeature = isObj(feature)
    ? getFeatureFromName(feature.name, feature.location)
    : getFeatureFromName(feature)

  return await setActiveFile(activeFeature)
}
