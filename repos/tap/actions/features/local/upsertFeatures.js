import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { noPropArr } from '@keg-hub/jsutils'

const { CATEGORIES } = Values
const cleanFeatName = feat => feat.toLowerCase().replace(/ /g, '')

export const upsertFeatures = (features=noPropArr) => {
  features && dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.FEATURES,
      items: features,
    },
  })
}