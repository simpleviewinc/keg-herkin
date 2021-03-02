import { Values } from 'SVConstants'
import { Drawer } from 'SVComponents'
import { useSelector } from 'SVHooks'
import { EditStep } from './editStep'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { StepMatchText } from './stepMatchText'
import { StepEditToggle } from './stepEditToggle'
import { devLog, getDefinitionFromId } from 'SVUtils'
import { updateStepIndex } from 'SVUtils/steps/updateStepIndex'
import { getDynamicMap } from 'SVUtils/steps/getDynamicMap'
import { replaceScenarioStep } from 'SVUtils/features/replaceScenarioStep'
import React, { useState, useCallback, useMemo } from 'react'
import { saveFeature } from 'SVActions/features/api/saveFeature'
import { copyStep } from 'SVActions/steps/copyStep'
import { useSetTimeout } from 'SVHooks'
import { SelectDefinitionType } from '../definition/selectDefinitionType'

const { CATEGORIES } = Values

/**
 * Hook to memoize the finding a definition based on uuid
 * @param {Array} definitions - All loaded step definition
 * @param {Object} step - Step containing the definition to find
 *
 * @returns {Object} - Found definition
 */
const useDefinition = (definitions, step) => {
  return useMemo(() => {
    return getDefinitionFromId(definitions, step.definition, step.altType || step.type)
  }, [ definitions, step ])
}

/**
 * Hook to get the step from the passed in scenario
 * @param {Object} scenario - Scenario containing the step to load
 * @param {function} setScenario - Function to update the current scenario
 * @param {Object} step - Step to be loaded from the scenario
 *
 * @returns {Object} - Found step
 */
const useStepFromScenario = (scenario, setScenario, step) => {
  return useMemo(() => {

    // Find the step within the scenario, and use that one
    const scenarioStep = scenario.steps.find(stp => {
      return stp.uuid === step.uuid
    })
    
    // Add helper method to update the scenario with the passed in step
    const setStep = updatedStep => {
      const updatedScenario = replaceScenarioStep(scenario, updatedStep)
      setScenario(updatedScenario)
    }

    return [scenarioStep, setStep]
  }, [scenario, setScenario, step, replaceScenarioStep])
}

const useHighlightAction = () => {
  // Store the highlight uuid in the state
  const [highlight, setHighlight] = useState(null)

  // Action to highlight a parameter when clicked on in the matchText
  const highlightAction = useCallback(tokenUuid => {
    setHighlight(tokenUuid)
  }, [highlight, setHighlight])

  // Call the timeout hook, to remove the highlight uuid at a later time
  useSetTimeout(() => {
    highlight && setHighlight(false)
  }, 1500, highlight)
  
  return {
    highlight,
    highlightAction,
    setHighlight,
  }
}

const useStepActions = (props) => {

  const {
    definitions,
    isEditing,
    feature,
    orgStep,
    scenario,
    setIsEditing,
    step,
    setScenario,
    setStep
  } = props

  // Action for saving the step to the feature / scenario
  const cancelAction = useCallback(()=> {

    // Revert to the original passed in step
    setStep(orgStep)
    // Set editing to false
    setIsEditing(false)

  }, [isEditing, step, orgStep ])

  // Action to enable editing a step
  const editAction = useCallback(()=> setIsEditing(!isEditing), [isEditing])

  // Action for saving the step to the feature / scenario
  const saveAction = useCallback(()=> {
    // Update the store with the new step information
    saveFeature(feature, scenario, step)
  }, [isEditing, step, feature, scenario])

  // Action for updating the step definition
  const selectAction = useCallback((value) => {
    const definition = getDefinitionFromId(definitions, value, step.altType || step.type)

    if(!definition)
      return devLog.info(`Could not find step definition with id: ${value}`, definitions)


    setStep({
      ...step,
      step: ``,
      definition: definition.uuid,
      dynamicMap: getDynamicMap(definition),
    })

  }, [isEditing, step, definitions, setStep])

  // Action for updating the step type
  const typeAction = useCallback(type => {
    setStep({
      ...step,
      ...(type === `and` ? { altType: 'when' } : {}),
      type,
      step: ``,
      definition: ``,
    })

  }, [isEditing, step, setStep])

  // Action to copy the step text to the clipboard
  const copyAction = useCallback(() => copyStep(step), [step])

  // Action to delete a step from the feature scenario
  const deleteAction = useCallback(() => {
    // TODO: add code to delete a step from the feature scenario
    console.log(`Delete Action not implemented!`)
  }, [isEditing, step, scenario, feature ])

  // Action to update the parameter of a step within a scenario
  const parameterAction = useCallback((row, param, value) => {
    const updatedStep = updateStepIndex(step, value, row, param)

    setStep(updatedStep)
  }, [isEditing, step, scenario, setScenario, setStep ])

  return {
    cancelAction,
    copyAction,
    deleteAction,
    editAction,
    parameterAction,
    saveAction,
    selectAction,
    typeAction,
  }

}

export const Step = props => {

  const { styles, feature } = props
  const [scenario, setScenario] = useState(props.scenario)
  const [step, setStep] = useStepFromScenario(scenario, setScenario, props.step)

  // TODO: revert this back to false when other steps are added back
  const [isEditing, setIsEditing] = useState(false)
  const { definitions } = useSelector(CATEGORIES.DEFINITIONS)
  const definition = useDefinition(definitions, step)

  const {
    cancelAction,
    copyAction,
    deleteAction,
    editAction,
    parameterAction,
    saveAction,
    selectAction,
    typeAction,
  } = useStepActions({
    definitions,
    isEditing,
    feature,
    orgStep: props.step,
    scenario,
    orgScenario: props.scenario,
    setScenario,
    setIsEditing,
    step,
    setStep,
  })

  const { highlight, highlightAction } = useHighlightAction()

  const theme = useTheme()
  const stepStyles = theme.get(`step`, styles)

  return (
    <View
      className={`step-main`}
      style={stepStyles.main}
    >
      <View
        className={`step-container`}
        style={stepStyles.container}
      >
        <SelectDefinitionType
          step={step}
          typeAction={typeAction}
        />
        <StepMatchText
          definition={definition}
          step={step}
          copyAction={copyAction}
          highlightAction={highlightAction}
        />
        <StepEditToggle
          isEditing={isEditing}
          className={`step-is-editing`}
          styles={stepStyles}
          cancelAction={cancelAction}
          editAction={editAction}
        />
      </View>
      <Drawer
        className='step-editing-drawer'
        styles={ stepStyles.drawer }
        toggled={ isEditing }
      >
       <EditStep
          {...props}
          step={step}
          definition={definition}
          styles={stepStyles.edit}
          cancelAction={cancelAction}
          copyAction={copyAction}
          deleteAction={deleteAction}
          highlight={highlight}
          parameterAction={parameterAction}
          saveAction={saveAction}
          selectAction={selectAction}
        />
      </Drawer>
    </View>
  )
}