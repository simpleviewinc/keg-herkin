import { dispatch } from 'SVStore'
import { loadFeature } from './loadFeature'
import { uuid, noOpObj } from '@keg-hub/jsutils'
import { Values, ActionTypes } from 'SVConstants'
import { getActiveFeature, validateFeatureAction } from 'SVUtils/features'

const { CATEGORIES } = Values

const noScenarioFound = (context, feature) => {
  return console.warn(
    `The feature scenario could not be found from the context`,
    { context, feature },
  )
}

const getLastScenario = feature => {
  return feature &&
    feature.scenarios &&
    feature.scenarios.length &&
    feature.scenarios[feature.scenarios.length - 1]
}

const getScenarioFromContext = (context, feature) => {
  // May want to add other context for adding a step to a features scenario
  // For now just check if we have access to the features AceEditor object
  if(!context.editor) return

  const editor = context.editor
  const { row, column } = editor.getCursorPosition()

  if(!row && !column) return getLastScenario(feature)

}

const stepFactory = (definition=noOpObj) => {
  return {
    uuid: uuid(),
    step: definition.name,
    type: definition.type,
    definition: definition.uuid,
    dynamicMap: definition?.tokens?.reduce((mapped, token) => {
      token.dynamic && (mapped[token.index] = token.value)

      return mapped
    }, {}),
  }
}

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
export const addStepFromDefinition = (definition, context, feature=getActiveFeature()) => {
  const scenario = getScenarioFromContext(context, feature)
  if(!scenario) return noScenarioFound(context, feature)

  const step = stepFactory(definition)

}