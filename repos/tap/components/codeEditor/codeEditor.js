import { Values } from 'SVConstants'
import { runTests } from 'SVActions'
import { EditorTabs } from './editorTabs'
import { pickKeys } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { AceEditor } from 'SVComponents/aceEditor'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { useSelector, shallowEqual } from 'react-redux'
import { FeatureEditor } from 'SVComponents/feature/featureEditor'
import React, { useCallback, useMemo, useState, useRef } from 'react'
import { DefinitionsEditor } from 'SVComponents/definition/definitionsEditor'

const { CATEGORIES, EDITOR_TABS } = Values

const useEditorActions = (feature, setFeature, definitions, setDefinitions) => {

  const onFeatureEdit = useCallback((text, change) => {
    text !== feature.content &&
      !text.trim() &&
      setFeature({ ...feature, text })
      
  }, [feature, setFeature])

  const onDefinitionEdit = useCallback((uuid, text, change) => {
    if(!text || !text.trim()) return

    const defs = definitions.map(def => {
      return def.uuid === uuid ? { ...def, text } : def
    })

    setDefinitions(defs)
  }, [definitions, setDefinitions])
  
  const onRunTests = useCallback(() => {
    
    runTests(feature, definitions)
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

const useFeatureData = () => {
  const { activeData, features, definitions } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.ACTIVE_DATA, CATEGORIES.FEATURES, CATEGORIES.DEFINITIONS ]
  ), shallowEqual)

  const feature = features && features[activeData?.feature]
  const matchingDefinitions = useMatchingDefinitions(feature, definitions)
  
  return { feature, definitions, matchingDefinitions }
}

export const CodeEditor = props => {

  const {
    feature,
    definitions,
    matchingDefinitions
  } = useFeatureData()

  const [activeFeat, setActiveFeat] = useState(feature)
  const [activeDefs, setActiveDefs] = useState(matchingDefinitions)

  const { onFeatureEdit, onDefinitionEdit, onRunTests } = useEditorActions(
    activeFeat,
    setActiveFeat,
    activeDefs,
    setActiveDefs
  )

  const [ tab, setTab ] = useActiveTab(props.activeTab || EDITOR_TABS.SPLIT)
  const codeStyles = useStyle(`screens.editors.${tab}`)
  const featureEditorRef = useRef(null)

  if(!activeFeat || !activeDefs) return null

  return (
    <>
      {(tab === EDITOR_TABS.FEATURE || tab === EDITOR_TABS.SPLIT) && (
        <FeatureEditor
          key={`${tab}-feature`}
          editorId={`feature-editor`}
          aceRef={featureEditorRef}
          onChange={onFeatureEdit}
          value={activeFeat.content || ''}
          style={codeStyles.feature || codeStyles}
        />
      )}
      {(tab === EDITOR_TABS.DEFINITIONS ||tab === EDITOR_TABS.SPLIT) && (
        <DefinitionsEditor
          key={`${tab}-definitions`}
          editorId={`definitions-editor`}
          onChange={onDefinitionEdit}
          active={activeDefs}
          list={definitions}
          feature={activeFeat}
          featureEditorRef={featureEditorRef}
          styles={codeStyles.definitions || codeStyles}
        />
      )}
      <EditorTabs activeTab={tab} onTabSelect={setTab} onRun={onRunTests} />
    </>
  )
}