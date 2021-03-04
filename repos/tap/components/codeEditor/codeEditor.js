import { Values } from 'SVConstants'
import { EditorTabs } from './editorTabs'
import { noOpObj, exists } from '@keg-hub/jsutils'
import { AceEditor } from 'SVComponents/aceEditor'
import React, { useRef, useCallback } from 'react'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { useStyle } from '@keg-hub/re-theme'
import { FeatureEditor } from 'SVComponents/feature/featureEditor'
import { DefinitionsEditor } from 'SVComponents/definition/definitionsEditor'
import { saveFile } from 'SVActions/files'
import { EditorFromType } from './editorFromType'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { usePendingCallback } from 'SVHooks/usePendingCallback'

const { EDITOR_TABS, SCREENS } = Values

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
    content && await saveFile({ ...activeFile, content })

    setIsSaving(false)

  }, [ editorRef.current, activeFile, SCREENS.EDITOR ])

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

  const [ tab, setTab ] = useActiveTab(activeTab || EDITOR_TABS.BDD_SPLIT.id)
  const isFeature = Boolean(activeFile.fileType === EDITOR_TABS.FEATURE.id)

  const forceFull = !isFeature &&
    (tab === EDITOR_TABS.BDD_SPLIT.id || tab === EDITOR_TABS.DEFINITIONS.id)

  const checkTab = forceFull ? EDITOR_TABS.FEATURE.id : tab
  const editorRef = useRef(null)
  const tabActions = useTabActions({...props, editorRef})
  const editorStyles = useStyle(`screens.editors`)
  const codeStyles = editorStyles?.[checkTab] || noOpObj
  const actionsStyles = editorStyles?.actions

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
          value={activeFile?.modified || activeFile?.content || ''}
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
        activeTab={checkTab}
        onTabSelect={setTab}
        showFeatureTabs={isFeature}
        styles={actionsStyles}
        { ...tabActions }
      />
    </>
  )
}