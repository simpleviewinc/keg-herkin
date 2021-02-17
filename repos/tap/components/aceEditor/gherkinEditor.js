import React, { useCallback } from 'react'
import { Values, ActionTypes } from 'SVConstants'
import { noPropArr, noOpObj, pickKeys } from '@keg-hub/jsutils'
import { useSelector, shallowEqual } from 'react-redux'
import ReactGherkinEditor from '@ltipton/react-gherkin-editor'

const { CATEGORIES } = Values

/**
 * Hook to find the currently loaded step definitions
 * Uses them to create an auto-complete dropdown for the editor
 * @param {string} feature 
 * @returns {Object}
 */
const useAutoComplete = (feature, definitions) => useCallback((type, text) => {
  const stepDefs = definitions[type.toLowerCase()]
  const matches = stepDefs.filter(def => def.name.startsWith(text))

  return matches.map(match => ({
    caption: match.name,
    value: match.name,
    score: Math.floor(Math.random() * Math.floor(100)),
    meta: match.type || 'Step'
  }))

}, [definitions])

export const GherkinEditor = props => {
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

  const { activeData, features, definitions } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.ACTIVE_DATA, CATEGORIES.FEATURES, CATEGORIES.DEFINITIONS ]
  ), shallowEqual)

  const feature = features && features[activeData?.feature]
  const autoComplete = useAutoComplete(feature, definitions)

  return (
    <ReactGherkinEditor
      ref={editorRef}
      initialValue={value}
      onValueChange={onChange}
      autoCompleteFunction={autoComplete}
      uniqueId={args.editorId}
      theme={'herkin'}
      mode={'gherkin_i18n'}
      language={ language || 'en'}
      hideToolbar={true}
      showGutter={showGutter}
      style={style}
    />
  )
}
