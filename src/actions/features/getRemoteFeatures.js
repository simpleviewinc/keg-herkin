import { apiRequest } from 'SVUtils/apiRequest'
import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
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

}