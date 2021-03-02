import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { validateFeatureAction } from 'SVUtils'
const { CATEGORIES } = Values

export const  removeFeatureTag = (parent, tag) => {
  const { feature, index } = validateFeatureAction(parent, 'tags')

  index > -1 &&
    feature &&
    dispatch({
      type: ActionTypes.SET_ITEM,
      payload: {
        key: index,
        category: CATEGORIES.FEATURES,
        item: {
          ...feature,
          ast: { ...feature.ast, tags: feature.tags.filter(pTag => pTag !== tag) }
        },
      },
    })

}