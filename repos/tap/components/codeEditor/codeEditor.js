import { Values } from 'SVConstants'
import { EditorTabs } from './editorTabs'
import { useStyle } from '@keg-hub/re-theme'
import { EditorFromType } from './editorFromType'
import React, { useRef } from 'react'
import { useActiveTab } from 'SVHooks/useActiveTab'
import { useEditorActions } from './useEditorActions'
import { noOpObj, exists, plural, capitalize } from '@keg-hub/jsutils'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Surface } from 'SVComponents/surface'

const { EDITOR_TABS, CATEGORIES } = Values

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

  const surfaceTitle = `${capitalize(activeFile?.fileType)} ${pendingFiles[activeFile?.location] ? '*' : ''}`
  return (
    <Surface
      className={`editor-main`}
      title={surfaceTitle}
      capitalize={false}
      styles={editorStyles?.surface}
      prefix={'Editor'}
      hasToggle={false}
    >
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
    </Surface>
  )
}