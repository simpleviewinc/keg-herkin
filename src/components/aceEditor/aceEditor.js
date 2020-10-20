import React from 'react'
import ReactAce from 'react-ace-editor'
import { useTheme } from '@keg-hub/re-theme'

const themeTypes = [
  `monokai`,
  `tomorrow`,
  `xcode`,
  `dreamweaver`,
  `github`,
  `textmate`,
]

export const AceEditor = props => {
  const tapTheme = useTheme()
  const {
    onChange,
    editorId=`ace-editor`,
    style,
    mode=`javascript`,
    theme=`xcode`,
    value='',
  } = props

  return (
    <ReactAce
      editorId={editorId}
      onChange={onChange}
      style={tapTheme.get(`aceEditor.main`, style)}
      mode={mode}
      theme={theme}
      value={value}
    />
  )
}