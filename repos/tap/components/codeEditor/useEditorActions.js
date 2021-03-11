import { useCallback } from 'react'
import { Values } from 'SVConstants'
import { noOpObj, get } from '@keg-hub/jsutils'
import { addToast } from 'SVActions/toasts/addToast'
import { runTests } from 'SVActions/runner/runTests'
import { saveFile } from 'SVActions/files/api/saveFile'
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

  return useCallback(async (event, testFile, testCommand, hasPending) => {
  
    if(!editorRef.current)
      return console.warn(`Editor Reference is not set!`)

    if(!testCommand)
      return console.warn(`Can not run tests for this file. It is not a test file!`)

    const content = editorRef.current?.editor?.getValue()
    await savePendingContent(content, testFile)
    
    // save the file first if it has pending changes
    const canRun = content !== testFile.content || hasPending
      ? await savePendingContent(content, testFile)
      : true

    canRun
      ? runTests(testFile, testCommand, SCREENS.EDITOR)
      : addToast({
          type: 'danger',
          message: `Can not run test on a file with pending changes!\n The file must be saved first!`,
        })

    // Return false so the original run tests method does not re-run the sets again
    return false
  }, [
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
const useSaveAction = (activeFile, editorRef, setIsSaving) => {
  return useCallback(async () => {
    if(!editorRef.current){
      setIsSaving(false)
      return false
    }

    setIsSaving(true)

    const content = editorRef.current?.editor?.getValue()
    await savePendingContent(content, activeFile)

    setIsSaving(false)

    return false
  }, [ editorRef.current, activeFile, setIsSaving, SCREENS.EDITOR ])
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
export const useEditorActions = (activeFile, editorRef, setIsSaving) => {
  return {
    onRun: useRunAction(activeFile, editorRef),
    onSave: useSaveAction(activeFile, editorRef, setIsSaving)
  }
}
