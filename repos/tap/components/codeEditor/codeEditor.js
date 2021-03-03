import { Values } from 'SVConstants'
import { EditorTabs } from './editorTabs'
import { useStyle } from '@keg-hub/re-theme'
import { EditorFromType } from './editorFromType'
import React, { useRef, useCallback } from 'react'
import { AceEditor } from 'SVComponents/aceEditor'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { useEditorActions } from './useEditorActions'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { noOpObj, exists, plural } from '@keg-hub/jsutils'
import { usePendingCallback } from 'SVHooks/usePendingCallback'
import { FeatureEditor } from 'SVComponents/feature/featureEditor'
import { DefinitionsEditor } from 'SVComponents/definition/definitionsEditor'
import { saveFile } from 'SVActions/files'
import { usePendingCallback } from 'SVHooks/usePendingCallback'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { setActiveFile } from 'SVActions/files/local/setActiveFile'

const { EDITOR_TABS, SCREENS, CATEGORIES } = Values

/**
 * MainEditor
 * @param {Object} props
 * @param {Object} props.activeFile
 */
const MainEditor = props => {
  const { activeFile } = props

  const onChange = usePendingCallback(SCREENS.EDITOR)

  return activeFile?.fileType === 'feature'
    ? (
      <FeatureEditor
        {...props}
        onChange={onChange}
        editorId={`feature-editor`}
      />
    )
    : (
      <AceEditor
        {...props}
        fileId={activeFile.location}
        onChange={onChange}
        editorId={`code-editor`}
        mode={'javascript'}
      />
    )
}

/**
 * Hook to run the active files tests, or save changes to the active file
 */
const useTabActions = (props) => {
  const { editorRef, activeFile } = props
  
  const onRun = useCallback(event => {
    console.log('---Run tests---')
  }, [])

  const onSave = useCallback(async setIsSaving => {
    if(!editorRef.current) return setIsSaving(false)

    setIsSaving(true)

    const content = editorRef.current?.editor?.getValue()
    // save the file and update active file
    content 
      && await saveFile({ ...activeFile, content })
      && setActiveFile(activeFile, content, SCREENS.EDITOR)
    setIsSaving(false)

  }, [ editorRef.current, activeFile, SCREENS.EDITOR ])

  return { onRun, onSave }
}

/**
 * CodeEditor
 * @param {Object} props
 * @param {String} props.initialTab - Initial tab to start as active
 * @param {Object} props.activeFile - test file to load
 */
export const CodeEditor = props => {
  const {
    initialTab,
    activeFile=noOpObj
  } = props

  const [ tab, setTab ] = useActiveTab(initialTab || EDITOR_TABS.BDD_SPLIT.id)
  const isFeature = Boolean(activeFile.fileType === EDITOR_TABS.FEATURE.id)
  const forceFull = !isFeature && tab !== EDITOR_TABS.FEATURE.id
  const editorRef = useRef(null)
  
  const tabActions = useEditorActions(activeFile, editorRef)
  const { pendingFiles=noOpObj } = useStoreItems([CATEGORIES.PENDING_FILES])

  const editorStyles = useStyle(`screens.editors`)
  const actionsStyles = editorStyles?.actions
  const codeStyles = editorStyles?.[forceFull ? 'full' : tab] || noOpObj

  if (!exists(activeFile.content)) return null

  /* TODO: Clean up constants and Actions tab
    * Constants
      * FEATURE should be it's own constant
        * Currently used for features && non-definition files
      * Need to add constants for waypoint and jest test files
        * Should show the Run and save action in the Actions tab
      * Need to add constant for non-test and non-definition files
        * Should show only save action in the Actions tab
    * Actions Tab ( In the EditorTabs component )
      * Run action should be disabled only for test files
        * feature / waypoint / jest
        * Currently hidden for all except feature files
  */

  return (
    <>
      {(tab === EDITOR_TABS.FEATURE.id || tab === EDITOR_TABS.BDD_SPLIT.id) && (
        <EditorFromType
          editorType={activeFile.fileType}
          aceRef={editorRef}
          key={`${tab}-feature`}
          activeFile={activeFile}
          setTab={setTab}
          editorId={`${activeFile.fileType}-editor`}
          value={pendingFiles[activeFile?.location] || activeFile?.content || ''}
          style={codeStyles.feature || codeStyles}
        />
      )}
      {(tab === EDITOR_TABS.DEFINITIONS.id ||tab === EDITOR_TABS.BDD_SPLIT.id) &&
        isFeature && (
          <EditorFromType
            editorType={EDITOR_TABS.DEFINITIONS.id}
            aceRef={editorRef}
            key={`${tab}-definitions`}
            activeFile={activeFile}
            editorId={`definitions-editor`}
            styles={codeStyles.definitions || codeStyles}
          />
      )}
      <EditorTabs
        activeTab={tab}
        onTabSelect={setTab}
        showRun={plural(activeFile.fileType) !== EDITOR_TABS.DEFINITIONS.id}
        showFeatureTabs={isFeature}
        styles={actionsStyles}
        { ...tabActions }
      />
    </>
  )
}