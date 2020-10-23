import React, { useRef, useEffect } from 'react'
import ReactAce from 'react-ace-editor'
import { useTheme } from '@keg-hub/re-theme'
import { isObj, checkCall } from '@keg-hub/jsutils'

const themeTypes = [
  `monokai`,
  `tomorrow`,
  `xcode`,
  `dreamweaver`,
  `github`,
  `textmate`,
  `chrome`
]

export const AceEditor = props => {
  const tapTheme = useTheme()
  const {
    aceRef,
    onChange,
    editorId=`ace-editor`,
    style,
    mode=`javascript`,
    theme=`chrome`,
    value='',
  } = props

  const editorRef = useRef(null)

  useEffect(() => {
    editorRef?.current?.editor?.resize()

    isObj(aceRef) && 'current' in aceRef
      ? (aceRef.current = editorRef?.current)
      : checkCall(editorRef)

  }, [])

  return (
    <ReactAce
      ref={editorRef}
      editorId={editorId}
      onChange={onChange}
      style={tapTheme.get(`aceEditor.main`, style)}
      mode={mode}
      theme={theme}
      value={value}
    />
  )
}