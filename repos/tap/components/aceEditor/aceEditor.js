import React, { useRef, useEffect, useState } from 'react'
import ReactAce from 'react-ace-editor'
import { useTheme } from '@keg-hub/re-theme'
import { ThemeOverrides } from './themeOverrides'
import { isObj, checkCall, deepMerge } from '@keg-hub/jsutils'
import { useStyleTag } from '@keg-hub/re-theme/styleInjector'
import { GherkinEditor } from './gherkinEditor'

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

const defOptions = {
  maxLines: 500,
  fontFamily: `'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace`,
  fontSize: '14px',
}

export const AceEditor = props => {
  const tapTheme = useTheme()

  const {
    aceRef,
    onChange,
    editorId=`ace-editor`,
    style,
    maxLines,
    fontFamily,
    fontSize,
    mode=`javascript`,
    theme=`chrome`,
    value='',
  } = props

  const editorRef = useRef(null)

  useEffect(() => {

    const editor = editorRef?.current?.editor
    editor?.resize()
    // The Ace editor only allows setting the initial text data
    // So we have to call the ace editor API directly to update the text content
    editor?.setValue(value, -1)

    // Hide the line in the center
    editor?.setShowPrintMargin(false)
    

    // Allow the editor to auto-update it's size
    editor?.setOptions(deepMerge(defOptions, {
      maxLines,
      fontFamily,
      fontSize,
    }))
    editor.setFontSize(fontSize || defOptions.fontSize)

    // Add a little padding to the top of the editor
    editor?.renderer.setScrollMargin(15)

    // Update any passed in parent refs
    isObj(aceRef) && 'current' in aceRef
      ? (aceRef.current = editorRef?.current)
      : checkCall(aceRef, editorRef)

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
      {mode === 'gherkin' ? (
        <GherkinEditor
          editorRef={editorRef}
          editorId={editorId}
          onChange={onChange}
          style={tapTheme.get(`aceEditor.main`, style)}
          theme={theme}
          value={value}
        />
      ): (
        <ReactAce
          ref={editorRef}
          editorId={editorId}
          onChange={onChange}
          style={tapTheme.get(`aceEditor.main`, style)}
          mode={mode}
          theme={theme}
          value={value}
        />
      )}
    </>
  )
}