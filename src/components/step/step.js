import React, { useState, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { And } from './and'
import { Given } from './given'
import { When } from './when'
import { Then } from './then'
import { saveStep } from 'SVActions'
import { Values } from 'SVConstants'
import { useSelector, shallowEqual } from 'react-redux'
import { mapObj, capitalize, pickKeys } from '@keg-hub/jsutils'
import {
  Button,
  Option,
  Select,
  Text,
  View
} from '@keg-hub/keg-components'

const { CATEGORIES } = Values

const stepTypes = {
  and: And,
  given: Given,
  when: When,
  then: Then,
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

const SelectStep = props => {
  const { styles, step, selectAction } = props
  const { steps } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.STEPS ]
  ), shallowEqual)


  const stepsFromType = step.type && steps[ step.altType || step.type]

  return (
    <Select
      className='select-step-main'
      styles={styles}
      value={step.definition}
      onValueChange={selectAction}
    >
      {stepsFromType && stepsFromType.map(parsed => {
        const { name, uuid } = parsed
        return (
          <Option
            key={uuid}
            value={uuid}
            label={name}
          />
        )
      })}
    </Select>
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
  const EditStep = isEditing && stepTypes[step.type]

  // Action to enable editing a step
  const editAction = useCallback(()=> setIsEditing(!isEditing), [isEditing])

  // Action for saving the step to the feature / scenario
  const saveAction = useCallback(()=> {
    // Update the store with the new step information
    saveStep(feature, scenario, step)
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
        { !isEditing ? (
          <>
            <StepText
              step={step}
              styles={stepStyles.text}
            />
            <Button
              className={`step-edit-button`}
              styles={stepStyles.editButton}
              onPress={editAction}
            >
              EDIT
            </Button>
          </>
        ) : (
          <SelectStep
            step={step}
            className={`step-select`}
            styles={stepStyles.selectStep}
            selectAction={selectAction}
          />
        )}
      </View>
      
      { EditStep && (
        <EditStep
          {...props}
          saveAction={saveAction}
          style={stepStyles}
        />
      )}
    </View>
  )
}