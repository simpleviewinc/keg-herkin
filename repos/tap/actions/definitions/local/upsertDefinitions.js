import { devLog } from 'SVUtils'
import { dispatch } from 'SVStore'
import { isArr, noPropArr } from '@keg-hub/jsutils'
import { Values, ActionTypes } from 'SVConstants'
import { organizeByType } from 'SVUtils/definitions/organizeByType'

const { CATEGORIES } = Values

/**
 * Dispatches the passed in step definitions to the Store
 * @type function
 * @param {Array} definitions - Parsed definitions matching the filesModel
 *
 * @returns {void}
 */
export const upsertDefinitions = (definitions=noPropArr) => {
  if(!isArr(definitions))
    return devLog(
      `warn`,
      `Upsert definitions requires an array of definition file models`,
      definitions
    )

  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.DEFINITIONS,
      items: definitions,
    },
  })

  const organizedDefs = organizeByType(definitions)

  // Sort the definitions by type ( given | then | etc... )
  // This makes it easier to match to features when editing
  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.DEFINITION_TYPES,
      items: organizeByType(definitions),
    },
  })

}