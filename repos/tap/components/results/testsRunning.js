import React from 'react'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { Loading, View, Text } from '@keg-hub/keg-components'

const MainView = reStyle(View)({
  width: `100%`,
  alI: 'center',
  jtC: 'center',
  minH: 200,
})

const Spinner = reStyle(Loading)(theme => ({
  color: theme?.tapColors?.defaultLight
}))

const Message = reStyle(Text)(theme => ({
  mT: theme?.margin?.size * 2,
  color: theme?.tapColors?.defaultLight,
  ftWt: 'bold',
}))

/**
 * TestsRunning
 * @param {Object} props
 * @param {Object} props.styles - Custom styles
 * 
 * @returns {Component}
 */
export const TestsRunning = props => {
  return (
    <MainView className={`tests-running-main`}>
      <Spinner />
      <Message className={`tests-running-text`}>
        Tests Running
      </Message>
    </MainView>
  )
}
