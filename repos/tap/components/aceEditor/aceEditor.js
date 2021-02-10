import React, { useRef, useEffect, useState } from 'react'
import ReactAce from 'react-ace-editor'
import { useTheme } from '@keg-hub/re-theme'
import { ThemeOverrides } from './themeOverrides'
import { isObj, checkCall } from '@keg-hub/jsutils'
import { useStyleTag } from '@keg-hub/re-theme/styleInjector'

let addOverrides = true
const setOverrides = val => (addOverrides = val)

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
    maxLines=500,
    mode=`javascript`,
    theme=`chrome`,
    value='',
  } = props

  const editorRef = useRef(null)

  useEffect(() => {
    const editor = aceRef?.current?.editor
    editor?.resize()
    // The Ace editor only allows setting the initial text data
    // So we have to call the ace editor API directly to update the text content
    editor?.setValue(value, -1)

    // Hide the line in the center
    editor?.setShowPrintMargin(false)
    
    // Allow the editor to auto-update it's size
    editor?.setOptions({ maxLines })

    isObj(aceRef) && 'current' in aceRef
      ? (aceRef.current = editorRef?.current)
      : checkCall(editorRef)

  }, [value, maxLines])

  return (
    <>
      {addOverrides && (
        <ThemeOverrides
          theme={tapTheme}
          addOverrides={addOverrides}
          setOverrides={setOverrides}
        />
      )}
      <ReactAce
        ref={editorRef}
        editorId={editorId}
        onChange={onChange}
        style={tapTheme.get(`aceEditor.main`, style)}
        mode={mode}
        theme={theme}
        value={value}
      />
    </>
  )
}