import { Values } from 'SVConstants'
import React, { useCallback, useMemo, useState } from 'react'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { EditorTabs } from './editorTabs'
import { AceEditor } from 'SVComponents/aceEditor'
import { useSelector, shallowEqual } from 'react-redux'
import { runTests } from 'SVActions'
import { FeatureEditor } from 'SVComponents/feature/featureEditor'
import { DefinitionsEditor } from 'SVComponents/definition/definitionsEditor'

const { CATEGORIES, EDITOR_MODES } = Values

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

const onTabSelect = (activeTab, setActiveTab) => useCallback(tab => {
  activeTab !== tab && setActiveTab(tab)
  return true
}, [activeTab, setActiveTab])

export const CodeEditor = props => {
  const theme = useTheme()

  const {
    feature,
    definitions,
    matchingDefinitions
  } = useFeatureData()

  const [localFeat, setLocalFeat] = useState(feature)
  const [localDefs, setLocalDefs] = useState(matchingDefinitions)

  const { onFeatureEdit, onDefinitionEdit, onRunTests } = useEditorActions(
    localFeat,
    setLocalFeat,
    localDefs,
    setLocalDefs
  )

  const [tab, setTab] = useState(props.activeTab || EDITOR_MODES.SPLIT)
  const tabSelect = onTabSelect(tab, setTab)
  const builtStyles = theme.get(`screens.editors.${tab}`)

  if(!localFeat || !localDefs) return null

  return (
    <>
      {(tab === 'feature' || tab === `split`) && (
        <FeatureEditor
          key={`${tab}-feature`}
          editorId={`feature-editor`}
          onChange={onFeatureEdit}
          value={localFeat.content || ''}
          style={builtStyles.feature || builtStyles}
        />
      )}
      {(tab === 'definitions' || tab === `split`) && (
        <DefinitionsEditor
          key={`${tab}-definitions`}
          editorId={`definitions-editor`}
          onChange={onDefinitionEdit}
          definitions={localDefs}
          styles={builtStyles.definitions || builtStyles}
        />
      )}
      <EditorTabs activeTab={tab} onTabSelect={tabSelect} onRun={onRunTests} />
    </>
  )
}