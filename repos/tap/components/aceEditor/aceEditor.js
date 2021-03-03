import React, { useRef, useEffect, useState, useCallback } from 'react'
import ReactAce from '@ltipton/react-ace-editor'
import { useTheme } from '@keg-hub/re-theme'
import { ThemeOverrides } from './themeOverrides'
import { isObj, checkCall, deepMerge, pickKeys } from '@keg-hub/jsutils'
import { useStyleTag } from '@keg-hub/re-theme/styleInjector'
import { GherkinEditor } from './gherkinEditor'

let addOverrides = true
const setOverrides = val => (addOverrides = val)

const defOptions = {
  value: '',
  maxLines: 500,
  fontSize: '12px',
  scrollMargin: 15,
  showGutter: true,
  showLineNumbers: true,
  scrollPastEnd: true,
  fixedWidthGutter: true,
  showPrintMargin: false,
  fileId: `empty-file`,
}

const getEditor = editorRef => editorRef?.current?.editor

const useConfigureEditor = (props, editorRef) => {
  const { aceRef } = props

  const {
    fontSize,
    fileId,
    maxLines,
    fontFamily,
    scrollMargin,
    scrollPastEnd,
    showLineNumbers,
    fixedWidthGutter,
    showPrintMargin,
    value,
  } = deepMerge(
    defOptions,
    pickKeys(props, Object.keys(defOptions))
  )

  const [ activeId, setActiveId ] = useState(fileId)

  // Set the value and editors separate from the reset of the config
  // This way value updates don't also call all the editor setting over and over again
  useEffect(() => {

    // Get access to the editor
    const editor = getEditor(editorRef)
    if(!editor) return

    if(fileId !== activeId){
      // The Ace editor only allows setting the initial text data
      // So we have to call the ace editor API directly to update the text content
      setActiveId(fileId)
      editor?.setValue(value, -1)
    }

    // Call resize after all settings have been updated
    editor?.resize()

  }, [
    value,
    fileId,
    activeId,
    setActiveId,
    editorRef?.current,
  ])

  // Updated the Ace editor settings based on the passed in props
  useEffect(() => {

    // Get access to the editor
    const editor = getEditor(editorRef)
    if(!editor) return

    // Hide the line in the center
    editor?.setShowPrintMargin(showPrintMargin)

    // Ensure the correct font-size
    editor?.setFontSize(fontSize)

    // Add a little padding to the top of the editor
    editor?.renderer.setScrollMargin(scrollMargin)

    editor?.setOptions({
      maxLines,
      fontSize,
      fontFamily,
      showLineNumbers,
      scrollPastEnd,
      fixedWidthGutter,
    })

    // Call resize after all settings have been updated
    editor?.resize()

    // Update any passed in parent refs
    isObj(aceRef) && 'current' in aceRef
      ? (aceRef.current = editorRef?.current)
      : checkCall(aceRef, editorRef)

  }, [
    maxLines,
    fontSize,
    fontFamily,
    scrollMargin,
    scrollPastEnd,
    showPrintMargin,
    showLineNumbers,
    fixedWidthGutter,
    aceRef?.current,
    editorRef?.current,
  ])
}

export const AceEditor = props => {
  const tapTheme = useTheme()

  const {
    aceRef,
    onChange,
    editorId=`ace-editor`,
    style,
    mode=`javascript`,
    showGutter=defOptions.showGutter,
    theme=`chrome`,
    value=defOptions.value,
  } = props

  const editorRef = aceRef || useRef(null)

  useConfigureEditor(props, editorRef)

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
          showGutter={showGutter}
          style={style}
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