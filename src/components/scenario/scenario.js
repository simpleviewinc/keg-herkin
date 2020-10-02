import React from 'react'
import { H6, View } from 'SVComponents'
import { Step } from '../step'
import { useTheme } from '@keg-hub/re-theme'

const BuildSteps = ({ scenario, feature, styles }) => {
  const { steps } = scenario
  return steps && steps.length && steps.map((step, index) => {
    return (
      <Step
        key={index}
        step={step}
        scenario={scenario}
        feature={feature}
        styles={styles}
      />
    )
  })
}

export const Scenario = props => {
  const { scenario, feature, styles } = props
  const theme = useTheme()
  const scenarioStyles = theme.get(`scenarios.scenario`, styles)


  return scenario && (
    <View style={scenarioStyles.main} >
      <H6 style={scenarioStyles.title} >
        { scenario.scenario }
      </H6>
      <View style={scenarioStyles.container} >
        <BuildSteps {...props} styles={scenarioStyles.step} />
      </View>
    </View>
  ) || null

}