import React, { useCallback } from 'react'
import { Values, ActionTypes } from 'SVConstants'
import { noPropArr, noOpObj, pickKeys } from '@keg-hub/jsutils'
import { useSelector, shallowEqual } from 'react-redux'
import ReactGherkinEditor from '@ltipton/react-gherkin-editor'

const { CATEGORIES } = Values
CATEGORIES.DEFINITIONS
CATEGORIES.FEATURES
// const initialValue = `Feature: Serve coffee
//   As a coffee lover
//   I can get coffee from the machine
//   So I can enjoy the rest of the day

//   Scenario: Simple use
//     # Well, sometimes, you just get a coffee.
//     Given the coffee machine is started
//     When I take a coffee
//     Then coffee should be served
//     And message "Please take your coffee" should be printed`

// const steps = [
//   'I start the coffee machine using language "lang"',
//   'I shutdown the coffee machine',
//   'message "message" should be displayed'
// ]

const useAutoComplete = (feature, definitions) => useCallback((type, text) => {
  const typeDefs = definitions[type.toLowerCase()]
  const matches = typeDefs.filter(def => def.name.startsWith(text))

  return matches.map(match => ({
    caption: match.name,
    // TODO: update steps to return the match string separate from the name
    // That way we can properly display it here for the user
    value: match.name,
    score: Math.floor(Math.random() * Math.floor(100)),
    meta: 'Step Def'
  }))

}, [feature, definitions])

export const GherkinEditor = props => {
  const {
    onChange,
    language,
    theme,
    value,
    editorRef,
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
      theme={'cucumber'}
      mode={'gherkin_scenario_i18n'}
      language={ language || 'en'}
      hideToolbar={true}
    />
  )
}
