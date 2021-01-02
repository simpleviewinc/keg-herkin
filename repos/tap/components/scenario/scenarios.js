import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Row, Grid } from 'SVComponents'
import { AddScenario } from './addScenario'
import { Scenario } from './scenario'

const BuildScenarios = ({ feature, styles }) => {
  const { scenarios } = feature
  return scenarios && scenarios.map(scenario => {
    return (
      <Scenario
        key={scenario.scenario}
        scenario={scenario}
        feature={feature}
        styles={styles}
      />
    )
  })
}

export const Scenarios = props => {
  const theme = useTheme()
  const styles = theme.scenarios
  const { feature } = props

  return (
    <Grid className={`scenarios-main`} style={styles.main} >
      { feature.scenarios && feature.scenarios.length && (
        <Row className={`scenarios-list-row`} style={styles.scenariosRow} >
          <BuildScenarios feature={feature} styles={styles.scenario} />
        </Row>
      )}
      <Row className={`scenarios-add-row`} style={styles.addRow} >
        <AddScenario feature={feature} styles={styles.add} />
      </Row>
    </Grid>
  )
}
