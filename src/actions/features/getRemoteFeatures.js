import { apiRequest } from 'SVUtils/apiRequest'
import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'

// Just here for now to test, should remove later
import { setFeatureActive } from './setFeatureActive'

const { CATEGORIES } = Values

export const getRemoteFeatures = async () => {
  const features = await apiRequest(`/features`)

  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.FEATURES,
      items: features,
    },
  })
  
  // Just here for now to test, should remove later
  features.length && setFeatureActive(features[0])

}