import { ToRun } from './toRun'
import { RunnerTabs } from './runnerTabs'
import { useTheme } from '@keg-hub/re-theme'
import { Surface } from 'SVComponents/surface'
import { useFeature } from 'SVHooks/useFeature'
import { Row } from '@keg-hub/keg-components/row'
import { View } from '@keg-hub/keg-components/view'
import { Grid } from '@keg-hub/keg-components/grid'
import { Results } from 'SVComponents/runner/results'
import { Button } from '@keg-hub/keg-components/button'
import { SubSurface } from 'SVComponents/surface/subsurface'
import { uuid } from '@keg-hub/jsutils'

import expect from "expect"
import { describe, test, run } from "jest-circus-browser"
import React, { useCallback, useRef, useState, useEffect } from "react"

const runTests = (describe, test, expect, run, testCode) => {
  return Function(`return (describe, test, expect, run) => {
    ${testCode}
    return run()
  }`)()(describe, test, expect, run)
}

// TODO: update this to save to the redux store
// Save all past tests
// Then when the tests are run again, remove them from the test results
// Jest keeps track of all tests ever run, so we get duplicates
// Need to investigate a way to clear them out
const useTestRunner = (setTestResults, editorRef) => {
  return useCallback(async () => {

    const editor = editorRef.current
    if(!editor) return

    const testCode = editor.innerText
    const { testResults } = await runTests(describe, test, expect, run, testCode)

    setTestResults(testResults.map(result => ({ ...result, id: uuid() })))

  },
  [
    setTestResults,
    editorRef.current
  ])

}

const useTabSelect = (activeTab, setActiveTab) => useCallback(tab => {
  activeTab !== tab && setActiveTab(tab)
  return true
}, [activeTab, setActiveTab])

const ToRunRow = ({ styles, tests, editorRef }) => {
  return (
    <Row className='runner-torun' style={styles.row} >
      <SubSurface
        classNames={'runner-container'}
        title={`Tests`}
        styles={styles.subsurface}
      >
        <ToRun
          ref={editorRef}
          features={tests}
          styles={styles.toRun}
        />
      </SubSurface>
    </Row>
  )
} 

const ResultsRow = ({ styles, results }) => {
  return (
    <Row className='runner-results' style={styles.row} >
      <SubSurface
        classNames={'runner-container'}
        title={`Results`}
        styles={styles.subsurface}
      >
        <Results results={results} />
      </SubSurface>
    </Row>
  )
}

export const Runner = props => {

  const {
    tests,
    title,
    prefix,
    activeTab,
    autoRun=true,
  } = props

  const theme = useTheme()
  const runnerStyles = theme.get('runner')

  const editorRef = useRef(null)
  const [tab, setTab] = useState(activeTab)
  const tabSelect = useTabSelect(tab, setTab)
  const [testResults, setTestResults] = useState([])
  const runTests = useTestRunner(setTestResults, editorRef, testResults)
  const { feature, definitions } = useFeature()

  useEffect(() => {
    autoRun && runTests()
  }, [autoRun, setTestResults])

  return (
    <Surface
      title={title}
      styles={runnerStyles.surface}
      prefix={prefix}
    >
      <Grid className={`runner-main`} style={runnerStyles.main} >
        <ToRunRow
          tests={tests}
          styles={runnerStyles}
          editorRef={editorRef}
        />
        <ResultsRow
          styles={runnerStyles}
          results={testResults}
        />
        <RunnerTabs
          activeTab={tab}
          onTabSelect={tabSelect}
          onRun={runTests}
        />
      </Grid>
    </Surface>
  )
}
