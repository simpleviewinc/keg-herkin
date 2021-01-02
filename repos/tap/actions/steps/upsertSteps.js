import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES } = Values

export const upsertSteps = steps => {

  steps && dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.STEPS,
      items: steps,
    },
  })

}