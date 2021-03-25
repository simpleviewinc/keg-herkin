import { upsertItems } from 'SVActions'
import { noOpObj } from '@keg-hub/jsutils'
import { Values } from 'SVConstants'
import { definitionsByType } from 'SVUtils/shared'

const { CATEGORIES } = Values

/**
 * Dispatches the passed in step definitions to the Store
 * @type function
 * @param {Array} definitions - Parsed definitions matching the filesModel
 *
 * @returns {void}
 */
export const upsertDefinitions = (definitions=noOpObj, definitionTypes) => {
  upsertItems(CATEGORIES.DEFINITIONS, definitions)
  upsertItems(CATEGORIES.DEFINITION_TYPES, definitionTypes || definitionsByType(definitions))
}