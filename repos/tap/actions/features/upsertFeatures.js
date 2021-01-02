import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

export const upsertFeatures = features => {
  features && dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.FEATURES,
      items: features,
    },
  })
}