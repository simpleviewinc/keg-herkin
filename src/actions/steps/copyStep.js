import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { devLog } from 'SVUtils/devLog'
const { CATEGORIES } = Values


export const copyStep = step => {
  step
    ? dispatch({
        type: ActionTypes.SET_ITEM,
        payload: {
          key: 0,
          category: CATEGORIES.COPY_STEP,
          item: { ...step },
        },
      })
    : devLog.warn(`Can not copy empty step!`)
}