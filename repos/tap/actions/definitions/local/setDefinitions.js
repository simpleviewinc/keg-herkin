import { dispatch } from 'SVStore'
import { noOpObj } from '@keg-hub/jsutils'
import { Values, ActionTypes } from 'SVConstants'
import { definitionsByType } from 'SVUtils/shared'

const { CATEGORIES } = Values

/**
 * Dispatches the passed in step definitions to the Store
 * @type function
 * @param {Array} definitions - Parsed definitions matching the filesModel
 *
 * @returns {void}
 */
export const setDefinitions = (definitions=noOpObj, definitionTypes) => {
  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: CATEGORIES.DEFINITIONS,
      items: definitions,
    },
  })

  // Sort the definitions by type ( given | then | etc... )
  // This makes it easier to match to features when editing
  definitionTypes && 
    dispatch({
      type: ActionTypes.SET_ITEMS,
      payload: {
        category: CATEGORIES.DEFINITION_TYPES,
        items: definitionTypes || definitionsByType(definitions),
      },
    })

}