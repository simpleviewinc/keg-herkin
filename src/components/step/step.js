import React, { useState, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { EditStep } from './editStep'
import { saveStep } from 'SVActions'
import { mapObj, capitalize } from '@keg-hub/jsutils'
import {
  Button,
  Option,
  Select,
  Text,
  View
} from '@keg-hub/keg-components'

const stepTypes = {
  and: 'And',
  given: 'Given',
  when: 'When',
  then: 'Then',
}

const TypeSelect = ({ styles, step, typeAction }) => {
  return (
    <Select
      className={`step-type-select`}
      styles={styles}
      value={step.type}
      onValueChange={typeAction}
    >
      {mapObj(stepTypes, (name => {
        return (
          <Option
            key={name}
            value={name}
            label={capitalize(name)}
          />
        )
      }))}
    </Select>
  )
}

const StepAction = ({ isEditing, cancelAction, editAction, styles }) => {
  const text = isEditing ? `CANCEL` : `EDIT`
  const onPress = isEditing ? cancelAction : editAction
  const buttonStyles = isEditing ? styles.cancelButton : styles.editButton

  return (
    <Button
      className={`step-edit-action`}
      styles={buttonStyles}
      onPress={onPress}
    >
      {text}
    </Button>
  )
}

const StepText = ({ styles, step }) => {
  return (
    <View className={`step-text-container`} style={styles.container} >
      <Text className={`step-text-text`} style={styles.text} >
        {step.step}
      </Text>
    </View>
  )
}


export const Step = props => {
  const { step, styles, feature, scenario } = props
  
  const theme = useTheme()
  const stepStyles = theme.get(`step`, styles)

  const [isEditing, setIsEditing] = useState(false)
  
  // Action to enable editing a step
  const editAction = useCallback(()=> setIsEditing(!isEditing), [isEditing])

  // Action for saving the step to the feature / scenario
  const cancelAction = useCallback(()=> {
    // Update the store with the new step information
    // TODO: Add code to reset the step to original state
    
    // Set editing to false
    setIsEditing(false)
  }, [isEditing, step, feature, scenario])

  // Action for updating the step definition
  const selectAction = useCallback(() => {
    
  }, [isEditing, step, feature, scenario])

  // Action for updating the step type
  const typeAction = useCallback(() => {
    
  }, [isEditing, step, feature, scenario])

  return (
    <View
      className={`step-main`}
      style={stepStyles.main}
    >
      <View
        className={`step-container`}
        style={stepStyles.container}
      >
        <TypeSelect
          styles={stepStyles.typeSelect}
          step={step}
          typeAction={typeAction}
        />
        <StepText
          step={step}
          styles={stepStyles.text}
        />
        <StepAction
          isEditing={isEditing}
          className={`step-is-editing`}
          styles={stepStyles}
          cancelAction={cancelAction}
          editAction={editAction}
        />
      </View>
      
      { isEditing && (
        <EditStep
          {...props}
          cancelAction={cancelAction}
          styles={stepStyles.edit}
        />
      )}
    </View>
  )
}