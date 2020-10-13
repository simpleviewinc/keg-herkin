import React, { useCallback } from 'react'
import { AceEditor } from 'SVComponents/aceEditor'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'

const editorStyles = {
  feature: {
    width: `100%`,
    height: `100%`,
  },
  definitions: {
    width: `100%`,
    height: `100%`,
  },
  testRunner: {
    width: `100%`,
    height: `100%`,
  },
  split: {
    feature: {
      width: `50%`,
    },
    definitions: {
      width: `50%`,
    },
  }
}

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
      style={[editorStyles.feature, props?.styles?.feature]}
    />
  )
}

const DefinitionsEditor = props => {
  return (
    <AceEditor
      {...props}
      mode='javascript'
      style={[editorStyles.definitions, props?.styles?.definitions]}
    />
  )
}

const TestRunner = props => {
  return (
    <AceEditor
      {...props}
      mode='text'
      readOnly={true}
      style={[editorStyles.testRunner, props?.styles?.testRunner]}
    />
  )
}

export const EditorScreen = props => {
  const theme = useTheme()
  const {
    definitions,
    feature,
    testsOutcome
  } = props
  
  const { onFeatureEdit, onDefinitionEdit } = useEditorActions(feature, definitions)
  const tab = 'feature'
  const isSplit = Boolean(tap === `split`)
  const builtStyles = theme.get(`screens.editors.${tab}`)

  return (
    <View
      className={`editors-screen`}
      styles={theme.get(`screens.editors.main`)}
    >
      {(tab === 'feature' || tap === `split`) && (
        <FeatureEditor
          isSplit={isSplit}
          mode='gherkin'
          onChange={onFeatureEdit}
          value={feature.text}
          styles={builtStyles}
        />
      )}
      {(tab === 'definitions' || tap === `split`) && (
        <DefinitionsEditor
          isSplit={isSplit}
          onChange={onDefinitionEdit}
          value={definitions.text}
          styles={builtStyles}
        />
      )}
      { tab === 'runner' && (
        <TestRunner
          tab={tab}
          value={testsOutcome}
          styles={builtStyles}
        />
      )}
    </View>
  )
  
}