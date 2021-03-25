import { devLog } from 'SVUtils'
import { dispatch } from 'SVStore'
import { upsertItems } from 'SVActions'
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
export const upsertDefinitions = (definitions, definitionTypes) => {
  definitions && upsertItems(CATEGORIES.DEFINITIONS, definitions)
  // Sort the definitions by type ( given | then | etc... )
  // This makes it easier to match to features when editing
  ;(definitions || definitionTypes) &&
    upsertItems(
      CATEGORIES.DEFINITION_TYPES,
      definitionTypes || definitionsByType(definitions)
    )
}