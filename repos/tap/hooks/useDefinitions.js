import { useMemo } from "react"
import { noOpObj } from '@keg-hub/jsutils'

/**
 * gets the matching definitions for the passed in feature fileModel
 * @param {Object} props
 * @param {Object} feature - Feature fileModel to map the definitions to
 * @param {Object} definitionTypes - All loaded definitions grouped by type
 *
 * @returns {Array} - Definitions that exist in the feature files ast
 */
export const useDefinitions = (feature=noOpObj, definitionTypes=noOpObj) => {
  return useMemo(() => {
    let mappedDefs = []
    if(!feature?.ast || !feature?.ast?.scenarios) return mappedDefs

    feature?.ast?.scenarios.map(scenario => {
      scenario.steps && scenario.steps.map(step => {
        const uuid = step.definition
        const type = step.type
        if(!definitionTypes || !definitionTypes[type]) return

        const foundDef = definitionTypes[type].find(def => def.uuid === step.definition)
        foundDef && mappedDefs.push(foundDef)
      })
    })

    return mappedDefs
  }, [feature.ast, definitionTypes])
}