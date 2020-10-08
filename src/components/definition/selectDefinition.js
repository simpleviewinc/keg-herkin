import React from 'react'
import { Values } from 'SVConstants'
import { useTheme } from '@keg-hub/re-theme'
import { useSelector } from 'SVHooks'
import {
  Label,
  Option,
  Select,
  View,
} from '@keg-hub/keg-components'

const { CATEGORIES, EMPTY_STEP } = Values

export const SelectDefinition = props => {
  const { styles, step, selectAction } = props
  const { definitions } = useSelector(CATEGORIES.DEFINITIONS)
  const definitionsFromType = step.type && definitions[step.altType || step.type]

  const theme = useTheme()
  const selectStyles = theme.get('definitions.select', styles)

  return (
    <View
      className={`step-edit-select-main`}
      style={selectStyles?.main}
    >
      <Label
        className={`step-edit-select-label`}
        style={selectStyles?.label}
      >
        Definition
      </Label>
      <Select
        className='step-edit-definition-select'
        styles={selectStyles.select}
        value={step.definition || EMPTY_STEP}
        onValueChange={selectAction}
      >
        {!step.definition && (
          <Option
            key={EMPTY_STEP}
            value={EMPTY_STEP}
            label={EMPTY_STEP}
          />
        )}
        {definitionsFromType && definitionsFromType.map(parsed => {
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
    </View>
  )

}
