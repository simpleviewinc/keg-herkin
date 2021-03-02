import { dispatch } from 'SVStore'
import { validateFeatureAction } from 'SVUtils'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Adds a new tag to a parent fileModels ast for features
 * @type function
 * @param {Object} parent - Item to add the tag to
 * @param {Object} tag - New tag to add to the parent
 *
 * @return {void}
 */
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