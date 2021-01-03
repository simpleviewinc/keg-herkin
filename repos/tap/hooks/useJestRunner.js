import { clearPreviousTests, runJestTests } from 'SVUtils/jest'
import { useCallback } from "react"


// TODO: update this to save to the redux store
// Save all past tests
// Then when the tests are run again, remove them from the test results
// Jest keeps track of all tests ever run, so we get duplicates
// Need to investigate a way to clear them out
export const useJestRunner = (setTestResults, setIsRunning, editorRef, page) => {
  return useCallback(async () => {
    if(!page || !editorRef.current) return

    const editor = editorRef.current.editor
    const testCode = editor.getValue()
    if(!testCode) return

    clearPreviousTests()
    setTestResults([])
    setIsRunning(true)

    const { testResults } = await runJestTests(testCode, page)

    setTimeout(() => {
      setTestResults(testResults)
      setIsRunning(false)
    }, 1000)

  },
  [
    setTestResults,
    editorRef.current,
    page
  ])

}
