import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES } = Values

export const upsertDefinitions = definitions => {
  definitions && dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.DEFINITIONS,
      items: definitions,
    },
  })
}