import React from 'react'
import { 
  Select as KegSelect,
  Option,
  Label,
  View
} from '@keg-hub/keg-components'
import { isObj } from '@keg-hub/jsutils'
import { reStyle } from '@keg-hub/re-theme/reStyle'


const ReStyleView = reStyle(
  View,
  'style'
)((__, props) => ({
  ...props?.style,
  padding: 8,
}))


/**
 * Creates the component based on the options passed in
 * @param {Array<{label:string, value:string}>} props.options - options to display
 * @returns
 */
const generateOptions = (options) => {
  return options.map((option, index) => {
    const mapped = isObj(option) ? option : { label: option, value: option }
    return (
      <Option
        key={index}
        label={mapped?.label}
        value={mapped?.value}
      />
    )
  })
}

/**
 * 
 * @param {Object} props 
 * @param {Array<{label:string, value:string}>} props.options - options to display
 * @returns
 */
export const Select = (props) => {

  const {
    title='',
    onValueChange,
    value,
    options=[],
    styles
  } = props

  return (
    <ReStyleView style={styles?.main}>
      <Label>{title}</Label>
      <KegSelect
        value={value}
        onValueChange={onValueChange}
      >
        {generateOptions(options)}
      </KegSelect>
    </ReStyleView>
  )
}