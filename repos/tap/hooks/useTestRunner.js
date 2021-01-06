import { useCallback } from "react"
import { isFunc } from '@keg-hub/jsutils'

export const useTestRunner = (setTestResults, setIsRunning, editorRef, parentMethods) => {
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

    const { testResults } = await parentMethods.runTests(testCode)

    setTimeout(() => {
      setTestResults(testResults)
      setIsRunning(false)
    }, 1000)

  },
  [
    setTestResults,
    editorRef.current,
    parentMethods
  ])

}
