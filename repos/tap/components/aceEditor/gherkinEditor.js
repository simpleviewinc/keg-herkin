import { useSelector } from 'SVHooks/useSelector'
import React, { useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Values, ActionTypes } from 'SVConstants'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { noPropArr, noOpObj, pickKeys } from '@keg-hub/jsutils'
import ReactGherkinEditor from '@ltipton/react-gherkin-editor'


const { CATEGORIES } = Values

/**
 * Hook to find the currently loaded step definitionTypes
 * Uses them to create an auto-complete dropdown for the editor
 * @param {string} feature 
 * @returns {Object}
 */
const useAutoComplete = (feature, definitionTypes) => useCallback((type, text) => {
  // TODO: Create a new item in the store for the parsed definitionTypes objects
  // Then pull in this item, instead of the definitionTypes fileModels
  // Currently this is broken because definitionTypes is an array of file models, NOT parsed definitionTypes objects
  const stepDefs = definitionTypes[type.toLowerCase()]
  const matches = stepDefs
    ? stepDefs.filter(def => def.name.startsWith(text))
    : noPropArr

  return matches.map(match => ({
    caption: match.name,
    value: match.name,
    score: Math.floor(Math.random() * Math.floor(100)),
    meta: match.type || 'Step'
  }))

}, [definitionTypes])

export const GherkinEditor = props => {
  const tapTheme = useTheme()

  const {
    onChange,
    language,
    style,
    theme,
    value,
    editorRef,
    showGutter=true,
    ...args
  } = props

  const feature = useActiveFile()
  const { definitionTypes } = useSelector(CATEGORIES.DEFINITION_TYPES)

  const autoComplete = useAutoComplete(feature, definitionTypes)


  return (
    <ReactGherkinEditor
      ref={editorRef}
      initialValue={value}
      onChange={onChange}
      autoCompleteFunction={autoComplete}
      uniqueId={args.editorId}
      theme={'herkin'}
      mode={'gherkin_i18n'}
      language={ language || 'en'}
      hideToolbar={true}
      showGutter={showGutter}
      style={tapTheme.get(style, `aceEditor.gherkin`)}
    />
  )
}
