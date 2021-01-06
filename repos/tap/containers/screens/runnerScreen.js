import expect from "expect"
import { exists } from '@keg-hub/jsutils'
import { useParentMethods } from 'SVHooks'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import React, { useState, useEffect } from "react"
import { Runner } from 'SVComponents/runner/runner'
import { Results } from 'SVComponents/runner/results'


// TODO: Replace with actual tests from definitions file
// For display, show features, but run step definitions
const defTests = `
describe('Example Tests', () => {

  it('should add two numbers', () => {
    expect(1+1).toBe(2)
  })

  test('should find the nav-bar button on the page', async () => {
    const button = await page.$('button.navbar-toggler')
    expect(button).not.toBe(undefined)
  })

})
`;

export const RunnerScreen = props => {
  const theme = useTheme()
  const builtStyles = theme.get(`screens.runner`)
  const parentMethods = useParentMethods()

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
        parentMethods={parentMethods}
      />
    </View>
  )
}
