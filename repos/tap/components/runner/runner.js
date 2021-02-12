import React, { useCallback, useRef, useState, useEffect } from "react"
import { uuid, checkCall } from '@keg-hub/jsutils'
import { RunnerTabs } from './runnerTabs'
import { useTheme } from '@keg-hub/re-theme'
import { useTestRunner } from 'SVHooks/useTestRunner'
import { View } from '@keg-hub/keg-components/view'
import { Results } from 'SVComponents/runner/results'
import { ToRun } from 'SVComponents/runner/toRun'
import { TestsRunning } from 'SVComponents/runner/testsRunning'

const useTabSelect = (activeTab, setActiveTab) => useCallback(tab => {
  activeTab !== tab && setActiveTab(tab)
  return true
}, [activeTab, setActiveTab])

export const Runner = props => {

  const {
    autoRun=false,
    activeTab,
    parentMethods,
    prefix,
    tests,
    title,
  } = props

  const theme = useTheme()
  const runnerStyles = theme.get('runner')

  const editorRef = useRef(null)
  const [tab, setTab] = useState(activeTab)
  const [ isRunning, setIsRunning ] = useState(false)

  const tabSelect = useTabSelect(tab, setTab)
  const [testResults, setTestResults] = useState([])


  const toggleToRunRef = useRef(null)
  const setToggleToRun = useCallback(setToRunToggle => {
    toggleToRunRef.current = setToRunToggle
  }, [ toggleToRunRef && toggleToRunRef.current ])

  const toggleResultsRef = useRef(null)
  const setToggleResults = useCallback(setResultsToggle => {
    toggleResultsRef.current = setResultsToggle
  }, [ toggleResultsRef && toggleResultsRef.current ])


  const onRunTests = useTestRunner({
    editorRef,
    setIsRunning,
    parentMethods,
    setTestResults,
    toggleToRun: toggleToRunRef.current,
    toggleResults: toggleResultsRef.current,
  })

  useEffect(() => {
    autoRun && onRunTests()
  }, [autoRun, setTestResults, parentMethods])

  return (
    <>
      <ToRun
        tests={tests}
        styles={runnerStyles}
        editorRef={editorRef}
        title={title}
        prefix={prefix}
        toggleHandel={setToggleToRun}
      />
      <Results
        results={testResults}
        styles={runnerStyles.results}
        toggleHandel={setToggleResults}
      />
      <RunnerTabs
        activeTab={tab}
        onTabSelect={tabSelect}
        onRun={onRunTests}
      />
      { isRunning && (<TestsRunning styles={runnerStyles} />)}
    </>
  )
}
