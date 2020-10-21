import { Values } from 'SVConstants'
import React, { useCallback, useMemo, useState } from 'react'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { EditorTabs } from './editorTabs'
import { AceEditor } from 'SVComponents/aceEditor'
import { useSelector, shallowEqual } from 'react-redux'

const { CATEGORIES, EDITOR_MODES } = Values

const useEditorActions = (feature, definitions) => {

  const onFeatureEdit = useCallback((text, change) => {
    if(text === feature.text || !text.trim()) return

    // Add code to update feature file
    console.log(`Feature file change not implemented!`)
  }, [feature])

  const onDefinitionEdit = useCallback((text, change) => {
    if(!text.trim() || definitions.map(def => def.text).indexOf(text) !== -1) return

    // Add code to update definition file
    console.log(`Definition file change not implemented!`)
  }, [definitions])
  
  const onRunTests = useCallback(() => {
    // Add code to update definition file
    console.log(`Run tests action not implemented!`)
  }, [ feature, definitions ])

  return { onFeatureEdit, onDefinitionEdit, onRunTests }
}

const useMatchingDefinitions = (feature, definitions) => {
  return useMemo(() => {
    let mappedDefs = []
    if(!feature || !feature.scenarios) return mappedDefs
    feature.scenarios.map(scenario => {
      scenario.steps && scenario.steps.map(step => {
        const uuid = step.definition
        const type = step.type
        if(!definitions || !definitions[type]) return

        const foundDef = definitions[type].find(def => def.uuid === step.definition)
        foundDef && mappedDefs.push(foundDef)
      })
    })

    return mappedDefs
  }, [feature, definitions])
}

const FeatureEditor = props => {
  return (
    <AceEditor
      {...props}
      mode='gherkin'
    />
  )
}

const DefinitionsEditor = ({ definitions, styles, ...props }) => {
  return (
    <View
      className='definitions-editors-wrapper'
      style={styles.main}
    >
      {definitions && definitions.map(def => {
          return (
            <AceEditor
              key={def.uuid}
              {...props}
              editorId={`definition-editor-${def.uuid}`}
              value={def.text || ''}
              style={styles.editor}
              mode='javascript'
            />
          )
        })}
    </View>
  )
}

const onTabSelect = (activeTab, setActiveTab) => useCallback(tab => {
  activeTab !== tab && setActiveTab(tab)
  return true
}, [activeTab, setActiveTab])

export const CodeEditor = props => {
  const theme = useTheme()

  const { activeData, features, definitions } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.ACTIVE_DATA, CATEGORIES.FEATURES, CATEGORIES.DEFINITIONS ]
  ), shallowEqual)

  const feature = features && features[activeData?.feature]

  const matchingDefinitions = useMatchingDefinitions(feature, definitions)
  const { onFeatureEdit, onDefinitionEdit } = useEditorActions(feature, matchingDefinitions)
  const [tab, setTab] = useState(props.activeTab || EDITOR_MODES.SPLIT)
  const tabSelect = onTabSelect(tab, setTab)
  const builtStyles = theme.get(`screens.editors.${tab}`)

  if(!feature || !matchingDefinitions) return null

  return (
    <>
      {(tab === 'feature' || tab === `split`) && (
        <FeatureEditor
          key={`${tab}-feature`}
          editorId={`feature-editor`}
          onChange={onFeatureEdit}
          value={feature.text || ''}
          style={builtStyles.feature || builtStyles}
        />
      )}
      {(tab === 'definitions' || tab === `split`) && (
        <DefinitionsEditor
          key={`${tab}-definitions`}
          editorId={`definitions-editor`}
          onChange={onDefinitionEdit}
          definitions={matchingDefinitions}
          styles={builtStyles.definitions || builtStyles}
        />
      )}
      <EditorTabs activeTab={tab} onTabSelect={tabSelect} />
    </>
  )
}