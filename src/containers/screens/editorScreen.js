import { Values } from 'SVConstants'
import React, { useCallback } from 'react'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { AceEditor } from 'SVComponents/aceEditor'
import { useSelector, shallowEqual } from 'react-redux'

const { CATEGORIES } = Values

const useEditorActions = (feature, definitions) => {
  const onFeatureEdit = useCallback(() => {
    // Add code to update feature file
    console.log(`Feature file change not implemented!`)
  }, [feature])

  const onDefinitionEdit = useCallback(() => {
    // Add code to update definition file
    console.log(`Definition file change not implemented!`)
  }, [definitions])
  
  const onRunTests = useCallback(() => {
    // Add code to update definition file
    console.log(`Run tests action not implemented!`)
  }, [ feature, definitions ])

  return { onFeatureEdit, onDefinitionEdit, onRunTests }
}

const FeatureEditor = props => {
  return (
    <AceEditor
      {...props}
      mode='gherkin'
    />
  )
}

const DefinitionsEditor = props => {
  return (
    <AceEditor
      {...props}
      mode='javascript'
    />
  )
}

const TestRunner = props => {
  return (
    <AceEditor
      {...props}
      mode='text'
      readOnly={true}
    />
  )
}

export const EditorScreen = props => {
  const theme = useTheme()
  const {
    testsOutcome
  } = props

  const { activeData, features, definitions } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.ACTIVE_DATA, CATEGORIES.FEATURES, CATEGORIES.DEFINITIONS ]
  ), shallowEqual)

  const feature = features && features[activeData?.feature]
  const { onFeatureEdit, onDefinitionEdit } = useEditorActions(feature, definitions)

  if(!feature || !definitions) return null

  const tab = 'split'
  const builtStyles = theme.get(`screens.editors.${tab}`)

  return (
    <View
      className={`editors-screen`}
      style={theme.get(`screens.editors.main`)}
    >
      {(tab === 'feature' || tab === `split`) && (
        <FeatureEditor
          editorId={`feature-editor`}
          onChange={onFeatureEdit}
          value={feature.text || ''}
          style={builtStyles.feature || builtStyles}
        />
      )}
      {(tab === 'definitions' || tab === `split`) && (
        <DefinitionsEditor
          editorId={`definitions-editor`}
          onChange={onDefinitionEdit}
          value={definitions.text || ''}
          style={builtStyles.definitions || builtStyles}
        />
      )}
      { tab === 'runner' && (
        <TestRunner
          editorId={`runner-editor`}
          tab={tab}
          value={testsOutcome}
          style={builtStyles}
        />
      )}
    </View>
  )
  
}