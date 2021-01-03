import expect from "expect"
import { exists } from '@keg-hub/jsutils'
import { usePlaywrightPage } from 'SVHooks'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import React, { useState, useEffect } from "react"
import { Runner } from 'SVComponents/runner/runner'
import { Results } from 'SVComponents/runner/results'


// TODO: Replace with actual tests from definitions file
// For display, show features, but run step definitions
const defTests = `
describe('basic math', () => {

  test('addition', () => {
    expect(1+1).toBe(2)
  })

  test('subtraction', async () => {
    const button = await page.$('button.navbar-toggler')
    console.log(button)
  })

})
`;

export const RunnerScreen = props => {
  const theme = useTheme()
  const builtStyles = theme.get(`screens.runner`)
  const page = usePlaywrightPage()

  const [ tests, setTests ] = useState(props.tests || defTests)
  useEffect(() => {
    exists(props.tests) &&
      props.tests !== tests &&
      setTests(props.tests)
  
  }, [ props.tests, tests, setTests ])


  return (
    <View
      className={`runner-screen`}
      style={builtStyles.main}
    >
      <Runner
        tests={tests}
        title={'Features'}
        prefix={`Test Runner - `}
        page={page}
      />
    </View>
  )
}
