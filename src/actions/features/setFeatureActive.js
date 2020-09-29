import { Values, ActionTypes } from 'SVConstants'
const { CATEGORIES } = Values
import { dispatch } from 'SVStore'

export const setFeatureActive = async feature => {

  dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.ACTIVE_FEATURE,
      item: feature,
    },
  })

}