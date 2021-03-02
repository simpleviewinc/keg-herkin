import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { validateFeatureAction } from 'SVUtils'
const { CATEGORIES } = Values

export const addFeatureTag = (parent, tag) => {
  const { feature, index } = validateFeatureAction(parent, 'tags')
  tag = tag[0] === '@' ? tag : `@${tag}`
  
  const tags = feature.ast.tags ? [ ...feature.ast.tags, tag ]  : [ tag ]

  index > -1 &&
    feature &&
    dispatch({
      type: ActionTypes.SET_ITEM,
      payload: {
        key: index,
        category: CATEGORIES.FEATURES,
        item: { ...feature, ast: { ...feature.ast, tags: tags }},
      },
    })

}