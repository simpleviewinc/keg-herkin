import React from 'react'
import { 
  Select as KegSelect, 
  Option, 
  Label,
  View
} from '@keg-hub/keg-components'
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
    return (
      <Option
        key={index}
        label={option?.label}
        value={option?.value}
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
    options=[],
    styles
  } = props

  return (
    <ReStyleView style={styles?.main}>
      <Label>{title}</Label>
      <KegSelect onValueChange={onValueChange}>
        {generateOptions(options)}
      </KegSelect>
    </ReStyleView>
  )
}