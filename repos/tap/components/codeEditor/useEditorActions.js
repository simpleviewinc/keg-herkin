import { useCallback } from 'react'
import { Values } from 'SVConstants'
import { noOpObj, get } from '@keg-hub/jsutils'
import { saveFile } from 'SVActions/files'
import { runTests } from 'SVActions/runner'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useSockr } from '@ltipton/sockr'
import { setActiveFileFromType } from 'SVActions/files/local/setActiveFileFromType'

const { SCREENS, CATEGORIES } = Values

/**
 * Hook to run the tests of the active file by calling the runTests action
 * @param {Object} activeFile - Current active file of the editor
 * @param {Object} editorRef - React ref object of the AceEditor
 *
 * @returns {function} - Callback to call when saving the active file
 */
const useRunAction = (activeFile, editorRef) => {

  const { commands=noOpObj } = useSockr()
  const { pendingFiles=noOpObj } = useStoreItems([CATEGORIES.PENDING_FILES])
  const hasPending = Boolean(pendingFiles[activeFile.location])
  const testCommand = get(commands, ['tests', activeFile.fileType ])

  return useCallback(async event => {
    // TODO: Add UI message, to warn that the file needs to be saved
    // Also add UI for if a file is not a test file, so no matching test command exists
  
    if(!editorRef.current)
      return console.warn(`Editor Reference is not set!`)

    if(!testCommand)
      return console.warn(`Can not run tests for this file. It is not a test file!`)

    const content = editorRef.current?.editor?.getValue()
    await savePendingContent(content, activeFile)
    
    // save the file first if it has pending changes
    const canRun = content !== activeFile.content || hasPending
      ? await savePendingContent(content, activeFile)
      : true

    canRun
      ? runTests(activeFile, testCommand, SCREENS.EDITOR)
      : console.warn(
          `Can not run test on a file with pending changes!`,
          `The file must be saved first!`
        )

  }, [
    hasPending,
    activeFile,
    testCommand,
    SCREENS.EDITOR,
    editorRef.current,
  ])
}

/**
 * Hook to save pending changes of the active file by calling the saveFile action
 * @param {Object} activeFile - Current active file of the editor
 * @param {Object} editorRef - React ref object of the AceEditor
 *
 * @returns {function} - Callback to call when saving the active file
 */
const useSaveAction = (activeFile, editorRef) => {
  return useCallback(async setIsSaving => {
    if(!editorRef.current) return setIsSaving(false)

    setIsSaving(true)

    const content = editorRef.current?.editor?.getValue()
    await savePendingContent(content, activeFile)

    setIsSaving(false)

  }, [ editorRef.current, activeFile, SCREENS.EDITOR ])
}

/**
 * Helper to save the file and updates the activeFile and file store
 * @param {string} content 
 * @param {object} activeFile - filemodel
 * 
 * @returns {boolean} - if successful or not
 */
const savePendingContent = async (content, activeFile) => {
  // save the file and update active file
  const saveResult = content && await saveFile({ ...activeFile, content })
  saveResult
    ? saveResult?.success && setActiveFileFromType(saveResult?.file, SCREENS.EDITOR)
    : false
}

/**
 * Hook to build callbacks for running tests, or saving changes to the active file
 */
export const useEditorActions = (activeFile, editorRef) => {
  return {
    onRun: useRunAction(activeFile, editorRef),
    onSave: useSaveAction(activeFile, editorRef)
  }
}
