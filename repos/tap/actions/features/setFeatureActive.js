import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { devLog } from 'SVUtils'

const { CATEGORIES } = Values

export const setFeatureActive = feature => {
  const { items } = getStore()?.getState()
  if(!items || !items.features)
    return devLog(`warn`, `No features exist in the store!`, items)

  const { features } = items
  const index = features.findIndex(feat => feat.feature === feature.feature)
  if(index === -1) return devLog(`warn`, `Feature does not exist in the items store!`, items)

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.ACTIVE_DATA,
      key: CATEGORIES.FEATURE,
      item: index,
    },
  })

}
