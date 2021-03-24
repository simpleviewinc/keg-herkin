import React, { useEffect, useRef } from 'react'
import { 
  Label,
  View,
  Input as KegInput,
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
 * Input component
 * @param {Object} props
 * @param {Array<{label:string, value:string}>} props.options - options to display
 * @returns
 */
export const Input = ({ onChange, styles, title='', value, inputRef, className }) => {

  const valueRef = useRef(value)
  inputRef = inputRef || useRef(null)

  useEffect(() => {
    if(valueRef.current === value) return

    valueRef.current = value
    inputRef.current && inputRef.current.focus()

  }, [ value, inputRef.current, valueRef.current ])

  return (
    <ReStyleView style={styles?.main}>
      <Label style={styles?.label} >
        {title}
      </Label>
      <KegInput
        className={className}
        style={styles?.input}
        ref={inputRef}
        onChange={onChange}
        value={value}
      />
    </ReStyleView>
  )
}