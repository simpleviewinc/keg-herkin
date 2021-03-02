import React, { useCallback, useRef, useState, useEffect } from "react"
import { getStore } from 'SVStore'
import { removePendingFile, setPendingFile } from 'SVActions/files/local'
import { RunnerTabs } from './runnerTabs'
import { useStyle } from '@keg-hub/re-theme'
import { useTestRunner } from 'SVHooks/useTestRunner'
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
        onChange={text => {
          const { items } = getStore().getState()

          text && text === items?.activeFile?.content
            ? removePendingFile()
            : setPendingFile(text)
        }}
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
