import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { validateFeatureAction } from 'SVUtils'
const { CATEGORIES } = Values

/**
 * Removes a tag from a parent fileModels ast for features
 * @type function
 * @param {Object} parent - Item to remove the tag from
 * @param {Object} tag - Tag to be removed from the parent
 *
 * @return {void}
 */
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