import { saveStep } from 'SVActions'
import { Values } from 'SVConstants'
import { Drawer } from 'SVComponents'
import { useSelector } from 'SVHooks'
import { EditStep } from './editStep'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { StepMatchText } from './stepMatchText'
import { StepEditToggle } from './stepEditToggle'
import { devLog, getDefinitionFromId } from 'SVUtils'
import React, { useState, useCallback, useMemo } from 'react'
import { SelectDefinitionType } from '../definition/selectDefinitionType'

const { CATEGORIES } = Values

const useDefinition = (definitions, step) => {
  return useMemo(() => {
    return getDefinitionFromId(definitions, step.definition, step.altType || step.type)
  }, [ definitions, step ])
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
    updateStep
  } = props

  // Action for saving the step to the feature / scenario
  const cancelAction = useCallback(()=> {

    // Set editing to false
    setIsEditing(false)

    // Revert to the original passed in step
    updateStep(orgStep)

  }, [isEditing, step, orgStep ])

  // Action to enable editing a step
  const editAction = useCallback(()=> setIsEditing(!isEditing), [isEditing])

  // Action for saving the step to the feature / scenario
  const saveAction = useCallback(()=> {
    // Update the store with the new step information
    saveStep(step, feature, scenario)
  }, [isEditing, step, feature, scenario])

  // Action for updating the step definition
  const selectAction = useCallback((value) => {
    const definition = getDefinitionFromId(definitions, value, step.altType || step.type)
    if(!definition) return devLog.info(`Could not find step definition with id: ${value}`, definitions)

    updateStep({
      ...step,
      step: ``,
      definition: definition.uuid,
    })

  }, [isEditing, step, definitions])

  // Action for updating the step type
  const typeAction = useCallback(type => {
    updateStep({
      ...step,
      ...(type === `and` ? { altType: 'when' } : {}),
      type,
      step: ``,
      definition: ``,
    })

  }, [isEditing, step])

  // Action to copy the step text to the clipboard
  const copyAction = useCallback(() => {
    // TODO: add code to copy the step text to the clipboard
    console.log(`Not implemented!`)
  }, [isEditing, step])

  // Action to delete a step from the feature scenario
  const deleteAction = useCallback(() => {
    // TODO: add code to delete a step from the feature scenario
    console.log(`Not implemented!`)
  }, [isEditing, step, scenario, feature ])

  return {
    cancelAction,
    copyAction,
    deleteAction,
    editAction,
    saveAction,
    selectAction,
    typeAction,
  }

}

export const Step = props => {
  const { styles, feature, scenario } = props
  
  const [step, updateStep] = useState(props.step)
  const [isEditing, setIsEditing] = useState(false)
  const { definitions } = useSelector(CATEGORIES.DEFINITIONS)
  const definition = useDefinition(definitions, step)

  const {
    cancelAction,
    copyAction,
    deleteAction,
    editAction,
    saveAction,
    selectAction,
    typeAction,
  } = useStepActions({
    definitions,
    isEditing,
    feature,
    orgStep: props.step,
    scenario,
    setIsEditing,
    step,
    updateStep,
  })

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
          styles={stepStyles.edit}
          cancelAction={cancelAction}
          copyAction={copyAction}
          deleteAction={deleteAction}
          saveAction={saveAction}
          selectAction={selectAction}
        />
      </Drawer>
    </View>
  )
}