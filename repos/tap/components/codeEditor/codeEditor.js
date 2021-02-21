import { Values } from 'SVConstants'
import { EditorTabs } from './editorTabs'
import { noOpObj, exists } from '@keg-hub/jsutils'
import { AceEditor } from 'SVComponents/aceEditor'
import React, { useRef, useCallback } from 'react'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { useTheme, useStyle } from '@keg-hub/re-theme'
import { FeatureEditor } from 'SVComponents/feature/featureEditor'
import { DefinitionsEditor } from 'SVComponents/definition/definitionsEditor'


const { EDITOR_TABS } = Values

/**
 * MainEditor
 * @param {Object} props
 */
const MainEditor = props => {
  return props?.activeFile?.isFeature
    ? (
      <FeatureEditor
        {...props}
        editorId={`feature-editor`}
      />
    )
    : (
      <AceEditor
        {...props}
        editorId={`code-editor`}
        mode={'javascript'}
      />
    )
}

const useTabActions = () => {
  const onRun = useCallback(event => {
    console.log('---Run tests---')
  }, [])

  const onSave = useCallback(event => {
    console.log('---Save file---')
  }, [])

  return { onRun, onSave }
}

/**
 * CodeEditor
 * @param {Object} props
 * @param {String} props.activeTab
 * @param {Object} props.activeFile - test file to load
 */
export const CodeEditor = props => {
  const {
    activeTab,
    activeFile=noOpObj
  } = props

  const [ tab, setTab ] = useActiveTab(activeTab || EDITOR_TABS.SPLIT)
  const forceFull = !activeFile.isFeature && (tab === EDITOR_TABS.SPLIT || tab === EDITOR_TABS.DEFINITIONS)
  const checkTab = forceFull ? EDITOR_TABS.FEATURE : tab

  const editorRef = useRef(null)
  const tabActions = useTabActions(props)
  const editorStyles = useStyle(`screens.editors`)
  const codeStyles = editorStyles?.[checkTab]
  const actionsStyles = editorStyles?.actions
  
  if (!exists(activeFile.content)) return null

  return (
    <>
      {(tab === EDITOR_TABS.FEATURE || tab === EDITOR_TABS.SPLIT) && (
        <MainEditor
          aceRef={editorRef}
          key={`${tab}-feature`}
          activeFile={activeFile}
          setTab={setTab}
          value={activeFile?.content || ''}
          style={codeStyles.feature || codeStyles}
        />
      )}
      {(tab === EDITOR_TABS.DEFINITIONS ||tab === EDITOR_TABS.SPLIT) &&
        activeFile?.isFeature && (
          <DefinitionsEditor
            featureEditorRef={editorRef}
            activeFile={activeFile}
            key={`${tab}-definitions`}
            editorId={`definitions-editor`}
            styles={codeStyles.definitions || codeStyles}
          />
      )}
      <EditorTabs
        activeTab={checkTab}
        onTabSelect={setTab}
        showFeatureTabs={activeFile.isFeature}
        styles={actionsStyles}
        { ...tabActions }
      />
    </>
  )
}