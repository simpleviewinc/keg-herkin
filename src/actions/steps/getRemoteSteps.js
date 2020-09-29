import { apiRequest } from 'SVUtils/apiRequest'
import { Values, ActionTypes } from 'SVConstants'
import { dispatch } from 'SVStore'
const { CATEGORIES } = Values

export const getRemoteSteps = async () => {
  const steps = await apiRequest(`/steps`)

  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.STEPS,
      items: steps,
    },
  })

}