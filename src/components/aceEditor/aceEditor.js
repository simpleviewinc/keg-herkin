import React from 'react'
import ReactAce from 'react-ace-editor'

const defStyles = {
  height: '75vh',
  width: '100vw',
  fontSize: '16px' 
}

export const AceEditor = props => {
  const {
    onChange,
    style,
    mode=`javascript`,
    theme=`monokai`,
    value='',
  } = props
  
  return (
    <ReactAce
      onChange={onChange}
      style={[defStyles, style]}
      mode={mode}
      theme={theme}
      value={value}
    />
  )
}