import { ToRun } from './toRun'
import { RunnerTabs } from './runnerTabs'
import { useTheme } from '@keg-hub/re-theme'
import { Surface } from 'SVComponents/surface'
import { useFeature } from 'SVHooks/useFeature'
import { useTestRunner } from 'SVHooks/useTestRunner'
import { Row } from '@keg-hub/keg-components/row'
import { AceEditor } from 'SVComponents/aceEditor'
import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { Grid } from '@keg-hub/keg-components/grid'
import { Results } from 'SVComponents/runner/results'
import { Button } from '@keg-hub/keg-components/button'
import { Loading } from '@keg-hub/keg-components/loading'
import { SubSurface } from 'SVComponents/surface/subsurface'
import { uuid, checkCall } from '@keg-hub/jsutils'
import React, { useCallback, useRef, useState, useEffect } from "react"

const useTabSelect = (activeTab, setActiveTab) => useCallback(tab => {
  activeTab !== tab && setActiveTab(tab)
  return true
}, [activeTab, setActiveTab])


const ToRunRow = props => {
  const { styles, tests, editorRef } = props
  return (
    <Row className='runner-torun' style={styles.row} >
      <SubSurface
        classNames={'runner-container'}
        title={`Tests`}
        styles={styles.subsurface}
      >
        <AceEditor
          aceRef={editorRef}
          onChange={text => checkCall(props.onChange, text)}
          editorId={`runner-tests-editor}`}
          value={tests || ''}
          style={styles.editor}
          mode='javascript'
          editorProps={{
            wrapBehavioursEnabled: false,
            animatedScroll: false,
            dragEnabled: false,
            tabSize: 2,
            wrap: true,
            ...props.editorProps,
          }}
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

  const onRunTests = useTestRunner(
    setTestResults,
    setIsRunning,
    editorRef,
    parentMethods,
  )

  const { feature, definitions } = useFeature()

  useEffect(() => {
    autoRun && onRunTests()
  }, [autoRun, setTestResults, parentMethods])

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
          onRun={onRunTests}
        />
        { isRunning && (
          <>
            <View
              className={`runner-isrunning-background`}
              style={runnerStyles?.isRunning?.background}
            />
            <View
              className={`runner-isrunning-container`}
              style={runnerStyles?.isRunning?.container}
            >
              <Loading
                className={`runner-isrunning-loading`}
                styles={runnerStyles?.isRunning}
                type={'primary'}
              />
              <Text
                className={`runner-isrunning-text`}
                style={runnerStyles?.isRunning.text}
              >
                Running Tests
              </Text>
            </View>
          </>
        )}
      </Grid>
    </Surface>
  )
}
