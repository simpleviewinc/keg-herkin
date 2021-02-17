import { Values } from 'SVConstants'
import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { EditorTabs } from './editorTabs'
import { AceEditor } from 'SVComponents/aceEditor'
import { useSelector, shallowEqual } from 'react-redux'
import { runTests } from 'SVActions'
import { FeatureEditor } from 'SVComponents/feature/featureEditor'
import { DefinitionsEditor } from 'SVComponents/definition/definitionsEditor'
import { useActiveTab } from 'SVHooks/useActiveTab'


const { CATEGORIES, EDITOR_TABS } = Values

const useEditorActions = (feature, setFeature, definitions, setDefinitions) => {

  const [localFeat, setLocalFeat] = useState(feature)

  const onFeatureEdit = useCallback((text) => {
    text !== localFeat?.content &&
      !text.trim() &&
      setLocalFeat({ ...feature, text }) // warning when switching 
      
  }, [feature, setLocalFeat])

  return (
    <AceEditor
      {...props}
      // onChange={() => {}}
      onChange={onFeatureEdit}
      mode={'gherkin'}
    />
  )
}
const DefinitionsEditor = ({ styles, activeFile, ...props }) => {
  console.log(activeFile, 'activeFile')

  const { definitions } = useFeature({path: activeFile?.fullPath}) || {}
  const [localDefs, setLocalDefs] = useState(definitions)
  console.log(localDefs,'localdef')
  console.log(definitions,' deffies')
  const onDefinitionEdit = useCallback((uuid, text) => {
    if(!text || !text.trim()) return

    const defs = localDefs.map(def => {
      return def.uuid === uuid ? { ...def, text } : def
    })

    setLocalDefs(defs)
  }, [localDefs, setLocalDefs])

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
              // onChange={text => onDefinitionEdit(def.uuid, text)}
              editorId={`definition-editor-${def.uuid}`}
              value={def.content || ''}
              style={styles.editor}
              mode='javascript'
              editorProps={{
                wrapBehavioursEnabled: false,
                animatedScroll: false,
                dragEnabled: false,
                tabSize: 2,
                wrap: true,
                ...props.editorProps,
              }}
            />
          )
        })}
    </View>
  )
}

const SecondaryEditor = props => {
  return props?.activeFile?.isFeature
    ? (
      <DefinitionsEditor
        {...props}
      />
    )
    : null
}

const MainEditor = props => {
  return props?.activeFile?.isFeature
    ? (
      <FeatureEditor
        {...props}
      />
    )
    : (
      <AceEditor
        {...props}
        mode={'javascript'}
      />
    )
}

export const CodeEditor = props => {
  const theme = useTheme()
  const editorRef = useRef(null)
  const { activeFile } = useStoreItems([CATEGORIES.ACTIVE_FILE])

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

  if(!activeFeat || !activeDefs) return null

  return (
    <>
      {(tab === EDITOR_TABS.FEATURE || tab === EDITOR_TABS.SPLIT) && (
        <FeatureEditor
          key={`${tab}-feature`}
          editorId={`feature-editor`}
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
          styles={codeStyles.definitions || codeStyles}
        />
      )}
      <EditorTabs activeTab={tab} onTabSelect={setTab} onRun={onRunTests} />
    </>
  )
}