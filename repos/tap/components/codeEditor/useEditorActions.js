import { useCallback } from 'react'
import { Values } from 'SVConstants'
import { noOpObj } from '@keg-hub/jsutils'
import { saveFile } from 'SVActions/files'
import { runTests } from 'SVActions/runner'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useSockr } from 'SVUtils/sockr'
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

  return useCallback(async event => {
    if(!editorRef.current)
      return  console.warn(`Editor Reference is not set!`)

    const content = editorRef.current?.editor?.getValue()
    const canRun = content !== activeFile.content || hasPending
      ? await saveFile({ ...activeFile, content }) && setActiveFileFromType(activeFile, SCREENS.EDITOR)
      : true

    // TODO: Add UI message, to warn that the file needs to be saved
    // Or that it couldn't save it for some reason
    canRun
      ? runTests(activeFile, commands.bbd, SCREENS.EDITOR)
      : console.warn(
          `Can not run test on a file with pending changes!`,
          `The file must be saved first!`
        )

  }, [
    hasPending,
    activeFile,
    commands.bbd,
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
    // save the file and update active file
    const saveResult = await saveFile({ ...activeFile, content })
    console.log(saveResult,' save result')
    content 
      && saveResult?.success
      && setActiveFileFromType(saveResult?.file, SCREENS.EDITOR)

    setIsSaving(false)

  }, [ editorRef.current, activeFile, SCREENS.EDITOR ])
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
