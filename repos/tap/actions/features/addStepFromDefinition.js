import { dispatch } from 'SVStore'
import { loadFeature } from './loadFeature'
import { uuid, noOpObj } from '@keg-hub/jsutils'
import { Values, ActionTypes } from 'SVConstants'
import { copyToDefinitionClipboard } from 'SVUtils/definitions'
import { getActiveFeature, validateFeatureAction } from 'SVUtils/features'

const { CATEGORIES } = Values

/**
 * Adds a step from the definition to currently active feature
 * Uses the context to find the active scenario
 * Based on editor cursor location or active scenario
 * @function
 * @public
 * @export
 * @param {Object} items - Redux store items containing the features and activeData
 *
 * @return {Object} - Found active feature
 */
export const addStepFromDefinition = (args) => {
  const { definition, clipboard } = args

  if(clipboard) return copyToDefinitionClipboard(definition)

  // TODO: Add other options for auto setting the step definition into the feature 

}