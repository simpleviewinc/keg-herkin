import React, { useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Values, ActionTypes } from 'SVConstants'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { useSelector, shallowEqual } from 'react-redux'
import { noPropArr, noOpObj, pickKeys } from '@keg-hub/jsutils'
import ReactGherkinEditor from '@ltipton/react-gherkin-editor'


const { CATEGORIES } = Values

/**
 * Hook to find the currently loaded step definitions
 * Uses them to create an auto-complete dropdown for the editor
 * @param {string} feature 
 * @returns {Object}
 */
const useAutoComplete = (feature, definitions) => useCallback((type, text) => {
  // TODO: Create a new item in the store for the parsed definitions objects
  // Then pull in this item, instead of the definitions fileModels
  // Currently this is broken because definitions is an array of file models, NOT parsed definitions objects
  const stepDefs = definitions[type.toLowerCase()]
  const matches = stepDefs
    ? stepDefs.filter(def => def.name.startsWith(text))
    : noPropArr

  return matches.map(match => ({
    caption: match.name,
    value: match.name,
    score: Math.floor(Math.random() * Math.floor(100)),
    meta: match.type || 'Step'
  }))

}, [definitions])

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

  const { definitions } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.DEFINITIONS ]
  ), shallowEqual)

  const feature = useActiveFile()
  const autoComplete = useAutoComplete(feature, definitions)


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
