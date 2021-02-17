import { useCallback } from "react"
import { isFunc, uuid, checkCall } from '@keg-hub/jsutils'

/**
 * Hook to run jest tests within a browser context
 * @function
 * @param {Object} options - Options to define how to run the tests
 * @param {function} options.setTestResults - Sets the test results to the Runner tabs state
 * @param {function} options.setIsRunning - Updates the Runner tabs isRunning state to true
 * @param {Object} options.editorRef - React Ref holding the Run containers Ace Editor instance 
 * @param {Object} options.parentMethods - Methods that can be called on the parent window
 *                                         Only valid when keg-herkin is loaded in an IFrame
 * @param {function} options.toggleToRun - Toggles the Run container open || closed
 * @param {function} options.toggleResults - Toggles the Results container open || closed
 *
 * @returns {function} - Callback function that will
 *                       - Pull the tests content from the options.editorRef
 *                       - Run the tests in the Parent Window
 *                       - Calls the options.parentMethods.runTests method passing options.editorRef content
 */
export const useTestRunner = options => {
  const {
    setTestResults,
    setIsRunning,
    editorRef,
    parentMethods,
    toggleToRun,
    toggleResults
  } = options
    
  return useCallback(async () => {
    if(!parentMethods || !editorRef.current) return

    const editor = editorRef.current.editor
    const testCode = editor.getValue()
    if(!testCode) return

    // Clear out past test runs
    isFunc(parentMethods.clearPreviousTests)
      && parentMethods.clearPreviousTests()
    setTestResults([])

    setIsRunning(true)
    checkCall(toggleToRun, true)

    const { results } = await parentMethods.runTests(testCode)
    const testResults = results.reduce((withId, result) => {
      result.id = result.id || uuid()
      withId.push(result)

      return withId
    }, [])

    setTimeout(() => {
      setTestResults(testResults)
      setIsRunning(false)
      checkCall(toggleToRun, false)
      checkCall(toggleResults, true)
    }, 500)

  },
  [
    setTestResults,
    editorRef.current,
    parentMethods
  ])

}
