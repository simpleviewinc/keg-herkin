import React from 'react'
import { 
  Select, 
  Option, 
  Label,
  View
} from '@keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'



/**
 * 
 * @param {Object} props 
 * @returns
 */
export const DropDown = (props) => {

  const {
    title='',
    onValueChange,
    options=[],
    styles
  } = props

  const theme = useTheme()
  const dropdownStyles = styles//theme.get('modal.filter')

  return (
    <View style={{...dropdownStyles?.main, paddingHorizontal: 8}}>
      <Label>{title}</Label>
      <Select onValueChange={onValueChange}>
        <Option
          label='Gherkin'
          value={'Gherkin'}
        />
      </Select>
    </View>
  )
}