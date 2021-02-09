import { RunnerTabs } from './runnerTabs'
import { useTheme } from '@keg-hub/re-theme'
import { Surface } from 'SVComponents/surface'
import { useTestRunner } from 'SVHooks/useTestRunner'
import { Row } from '@keg-hub/keg-components/row'
import { AceEditor } from 'SVComponents/aceEditor'
import { View } from '@keg-hub/keg-components/view'
import { Text } from '@keg-hub/keg-components/text'
import { Grid } from '@keg-hub/keg-components/grid'
import { Results } from 'SVComponents/runner/results'
import { Loading } from '@keg-hub/keg-components/loading'
import { SubSurface } from 'SVComponents/surface/subsurface'
import { uuid, checkCall } from '@keg-hub/jsutils'
import React, { useCallback, useRef, useState, useEffect } from "react"

const useTabSelect = (activeTab, setActiveTab) => useCallback(tab => {
  activeTab !== tab && setActiveTab(tab)
  return true
}, [activeTab, setActiveTab])


const ToRunSection = props => {
  const { styles, tests, editorRef, title, prefix } = props

  return (
    <Surface
      title={title}
      capitalize={false}
      styles={styles.surface}
      prefix={prefix || 'Runner'}
    >
      <Grid className={`runner-main`} style={styles.main} >
        <Row className='runner-torun' style={styles?.toRun?.row} >
          <AceEditor
            aceRef={editorRef}
            onChange={text => checkCall(props.onChange, text)}
            editorId={`runner-tests-editor`}
            value={tests || ''}
            style={styles.toRun.editor}
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
        </Row>
      </Grid>
    </Surface>
  )
} 

const ResultsSection = ({ styles, results, isRunning, prefix, title }) => {
  return (
    <Surface
      title={title}
      capitalize={false}
      styles={styles.surface}
      prefix={prefix || `Results`}
    >
      <Grid className={`runner-main`} style={styles.main} >
        <Row className='runner-results-row' style={styles?.results?.row} >
          <Results results={results} />
        </Row>
        { isRunning && (
          <>
            <View
              className={`runner-isrunning-background`}
              style={styles?.isRunning?.background}
            />
            <View
              className={`runner-isrunning-container`}
              style={styles?.isRunning?.container}
            >
              <Loading
                className={`runner-isrunning-loading`}
                styles={styles?.isRunning}
                type={'primary'}
              />
              <Text
                className={`runner-isrunning-text`}
                style={styles?.isRunning.text}
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

  useEffect(() => {
    autoRun && onRunTests()
  }, [autoRun, setTestResults, parentMethods])

  return (
    <>
      <ToRunSection
        tests={tests}
        styles={runnerStyles}
        editorRef={editorRef}
        title={title}
        prefix={prefix}
      />
      <ResultsSection
        isRunning={isRunning}
        results={testResults}
        styles={runnerStyles}
      />
      <RunnerTabs
        activeTab={tab}
        onTabSelect={tabSelect}
        onRun={onRunTests}
      />
    </>
  )
}
