import React from 'react'
import { Values } from 'SVConstants'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { useSelector, shallowEqual } from 'react-redux'
import { Option, Select, View } from '@keg-hub/keg-components'
const { CATEGORIES } = Values

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

export const EditStep = ({ step, selectAction, styles }) => {
  const theme = useTheme()
  const editStyles = theme.get('editStep', styles)

  return (
    <View
      className={`step-edit-main`}
      style={editStyles.main}
    >
      <SelectStep
        step={step}
        className={`step-select`}
        styles={editStyles.selectStep}
        selectAction={selectAction}
      />
    </View>
  )
}