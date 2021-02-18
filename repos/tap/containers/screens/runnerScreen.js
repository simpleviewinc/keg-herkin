import { exists } from '@keg-hub/jsutils'
import { useParentMethods } from 'SVHooks'
import { useStyle } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import React, { useState, useEffect } from 'react'
import { Runner } from 'SVComponents/runner/runner'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values

export const RunnerScreen = props => {
  const builtStyles = useStyle(`screens.runner`)
  const parentMethods = useParentMethods()
  const [ tests, setTests ] = useState('')

  const {runnerContent} = useStoreItems(CATEGORIES.ACTIVE_RUNNER_TESTS) || {}
  useEffect(() => {
    exists(runnerContent) &&
    runnerContent !== tests &&
      setTests(runnerContent)
  
  }, [ tests, setTests, runnerContent ])

  // TODO: Update to be the selected test type, instead of hard coded
  const title = 'Features'

  return (
    <View
      className={`runner-screen`}
      style={builtStyles.main}
    >
      <Runner
        tests={tests}
        title={'Features'}
        parentMethods={parentMethods}
      />
    </View>
  )
}
