import { Values } from 'SVConstants'
import React, { useRef } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { EditorTabs } from './editorTabs'
import { useStyle } from '@keg-hub/re-theme'
import { AceEditor } from 'SVComponents/aceEditor'
import { FeatureEditor } from 'SVComponents/feature/featureEditor'
import { DefinitionsEditor } from 'SVComponents/definition/definitionsEditor'
import { useActiveTab } from 'SVHooks/useActiveTab'


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

/**
 * CodeEditor
 * @param {Object} props
 * @param {String} props.activeTab
 * @param {Object} props.activeFile - test file to load
 */
export const CodeEditor = props => {
  const {
    activeTab,
    activeFile
  } = props
  if (!activeFile) return null

  const [ tab, setTab ] = useActiveTab(activeTab || EDITOR_TABS.SPLIT)
  const codeStyles = useStyle(`screens.editors.${tab}`)
  const editorRef = useRef(null)
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
      <EditorTabs activeTab={tab} onTabSelect={setTab} onRun={() => console.log('---Run tests---')} />
    </>
  )
}