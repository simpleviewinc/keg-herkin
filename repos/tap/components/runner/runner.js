import { Values } from 'SVConstants'
import { RunnerTabs } from './runnerTabs'
import { useStyle } from '@keg-hub/re-theme'
import { ToRun } from 'SVComponents/runner/toRun'
import { useTestRunner } from 'SVHooks/useTestRunner'
import { Results } from 'SVComponents/runner/results'
import { TestsRunning } from 'SVComponents/runner/testsRunning'
import { usePendingCallback } from 'SVHooks/usePendingCallback'
import React, { useCallback, useRef, useState, useEffect, useMemo } from "react"

const { SCREENS } = Values

const useTabSelect = (activeTab, setActiveTab) => useCallback(tab => {
  activeTab !== tab && setActiveTab(tab)
  return true
}, [activeTab, setActiveTab])

export const Runner = props => {

  const {
    activeFile,
    autoRun=false,
    activeTab,
    parentMethods,
    prefix,
    tests,
    title,
  } = props

  const runnerStyles = useStyle('runner')

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

  const toRunOnChange = usePendingCallback(activeFile, SCREENS.RUNNER)

  useEffect(() => {
    autoRun && onRunTests()
  }, [autoRun, setTestResults, parentMethods])

  return (
    <>
      <ToRun
        tests={tests}
        fileId={activeFile.location}
        styles={runnerStyles}
        editorRef={editorRef}
        title={title}
        prefix={prefix}
        toggleHandel={setToggleToRun}
        onChange={toRunOnChange}
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
