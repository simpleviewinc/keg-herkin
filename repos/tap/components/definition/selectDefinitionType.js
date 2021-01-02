import React from 'react'
import { Values } from 'SVConstants'
import { capitalize } from '@keg-hub/jsutils'
import { Option, Select } from '@keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'
const { STEP_TYPES } = Values

export const SelectDefinitionType = ({ styles, step, typeAction }) => {
  const theme = useTheme()
  const selectStyles = theme.get(`definitions.selectType`, styles)

  return (
    <Select
      className={`step-type-select`}
      styles={selectStyles}
      value={step.type}
      onValueChange={typeAction}
    >
      {STEP_TYPES.map(name => {
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
