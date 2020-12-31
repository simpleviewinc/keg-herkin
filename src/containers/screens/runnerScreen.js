import React from "react"
import expect from "expect"
import { describe, test, run } from "jest-circus-browser"
import { Results } from 'SVComponents/runner/results'
import { Runner } from 'SVComponents/runner/runner'
import { useTheme } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'


// TODO: Replace with actual tests from definitions file
// For display, show features, but run step definitions
const tests = `
      describe('basic math', () => {<br/>
     &nbsp&nbsp;test('addition', () => {<br/>
      &nbsp;&nbsp;&nbsp&nbsp;expect(1+1).toBe(2);<br/>
      &nbsp;&nbsp;})<br/>
      &nbsp&nbsp;test('subtraction', () => {<br/>
        &nbsp;&nbsp;&nbsp&nbsp;expect(1+1).toBe(0);<br/>
        &nbsp;&nbsp;})<br/>
      });
    `;


export const RunnerScreen = props => {
  const theme = useTheme()
  const builtStyles = theme.get(`screens.runner`)

  return (
    <View
      className={`runner-screen`}
      style={builtStyles.main}
    >
      <Runner
        tests={tests}
        title={'Features'}
        prefix={`Test Runner - `}
      />
    </View>
  )
}
