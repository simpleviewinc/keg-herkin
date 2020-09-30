import React from 'react'
import { Grid, Row, Text } from 'SVComponents'
import { AddScenario } from './addScenario'
import { Scenario } from './scenario'


const BuildScenarios = ({ feature }) => {
  const { scenarios } = feature
  return scenarios && scenarios.map(scenario => {
    return (
      <Scenario
        key={scenario.scenario}
        scenario={scenario}
        feature={feature}
      />
    )
  })
}

export const Scenarios = props => {
  const { feature } = props
  return (
    <Grid>
      { feature.scenarios && feature.scenarios.length && (
        <Row>
          <BuildScenarios feature={feature} />
        </Row>
      )}
      <Row>
        <AddScenario feature={feature} />
      </Row>
    </Grid>
  )
}