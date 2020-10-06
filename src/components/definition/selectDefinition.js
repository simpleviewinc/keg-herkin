import React from 'react'
import { Values } from 'SVConstants'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { useSelector, shallowEqual } from 'react-redux'
import {
  Label,
  Option,
  Select,
} from '@keg-hub/keg-components'

const { CATEGORIES } = Values

export const SelectDefinition = props => {
  const { styles, step, selectAction } = props
  const { definitions } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.DEFINITIONS ]
  ), shallowEqual)

  const definitionsFromType = step.type && definitions[step.altType || step.type]

  return (
    <>
      <Label
        className={`step-edit-select-label`}
        style={styles.label}
      >
        Definition
      </Label>
      <Select
        className='select-step-main'
        styles={styles}
        value={step.definition}
        onValueChange={selectAction}
      >
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
    </>
  )

}
