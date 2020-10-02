import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { And } from './and'
import { Given } from './given'
import { When } from './when'
import { Then } from './then'
import { mapObj, capitalize } from '@keg-hub/jsutils'
import {
  Input,
  Option,
  Row,
  Select,
  Text,
  View
} from '@keg-hub/keg-components'

const stepTypes = {
  and: And,
  given: Given,
  when: When,
  then: Then,
}


const TypeSelect = ({ styles, step }) => {
  return (
    <Select
      className={`step-type-select`}
      styles={styles}
      value={step.type}
    >
      {mapObj(stepTypes, (name) => {
        return (
          <Option
            key={name}
            value={name}
            label={capitalize(name)}
          />
        )
      })}
    </Select>
  )
}

const StepText = ({ styles, step }) => {
  // TODO: build out the select options for the type
  // Map the current step to the parsed version of it
  const StepComp = stepTypes[step.type]
  return (
    <View className={`step-text-container`} style={styles.container} >
      <Text className={`step-text-text`} style={styles.text} >
        {step.step}
      </Text>
    </View>
  )
}
 
export const Step = props => {
  const { step, styles } = props
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
        <TypeSelect styles={stepStyles.typeSelect} step={step} />
        <StepText styles={stepStyles.text} step={step} />
      </View>
      
    </View>
  )
}