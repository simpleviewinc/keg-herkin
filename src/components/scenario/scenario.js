import React from 'react'
import { H6, View } from 'SVComponents'
import { Step } from '../step'


const BuildSteps = ({ scenario, feature }) => {
  const { steps } = scenario
  return steps && steps.length && steps.map((step, index) => {
    return (
      <Step
        key={index}
        step={step}
        scenario={scenario}
        feature={feature}
      />
    )
  })
}

export const Scenario = props => {
  const { scenario, feature } = props
  if(!scenario) return null

  return (
    <View style={{ padding: 15, paddingBottom: 0 }} >
      <H6>
        Steps
      </H6>
      <View>
        <BuildSteps {...props} />
      </View>
    </View>
  )

}