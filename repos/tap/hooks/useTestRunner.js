import { useCallback } from "react"
import { isFunc, uuid } from '@keg-hub/jsutils'

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
    const { results } = await parentMethods.runTests(testCode)
    const testResults = results.reduce((withId, result) => {
      result.id = result.id || uuid()
      withId.push(result)

      return withId
    }, [])

    setTimeout(() => {
      setTestResults(testResults)
      setIsRunning(false)
    }, 500)

  },
  [
    setTestResults,
    editorRef.current,
    parentMethods
  ])

}
