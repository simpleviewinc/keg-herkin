import { exists } from '@keg-hub/jsutils'
import { useParentMethods } from 'SVHooks'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import React, { useState, useEffect } from 'react'
import { Runner } from 'SVComponents/runner/runner'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values

export const RunnerScreen = props => {
  const theme = useTheme()
  const builtStyles = theme.get(`screens.runner`)
  const parentMethods = useParentMethods()
  const [ tests, setTests ] = useState('')

  const {runnerContent} = useStoreItems(CATEGORIES.ACTIVE_RUNNER_TESTS) || {}
  console.log(runnerContent)
  useEffect(() => {
    exists(runnerContent) &&
    runnerContent !== tests &&
      setTests(runnerContent)
  
  }, [ tests, setTests, runnerContent ])

  return (
    <View
      className={`runner-screen`}
      style={builtStyles.main}
    >
      <Runner
        tests={tests}
        title={'Features'}
        prefix={`Test Runner - `}
        parentMethods={parentMethods}
      />
    </View>
  )
}
