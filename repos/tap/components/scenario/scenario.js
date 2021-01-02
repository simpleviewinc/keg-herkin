import React from 'react'
import { Step } from '../step'
import { useTheme } from '@keg-hub/re-theme'
import { SubSurface } from '../surface/subsurface'
import { wordCaps } from '@keg-hub/jsutils'

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

const classNames = {
  main: `scenario-main`,
  headerRow: `scenario-header-row`,
  header: { main: `scenario-header` },
  containerRow: `scenario-container-row`,
  container: `scenario-container`
}

export const Scenario = props => {
  const { scenario, styles, feature } = props
  const theme = useTheme()
  const scenarioStyles = theme.get(`scenarios.scenario`, styles)

  return scenario && (
    <SubSurface
      classNames={classNames}
      styles={scenarioStyles}
      prefix={`Scenario - `}
      title={wordCaps(scenario.scenario)}
    >
      <BuildSteps {...props} styles={scenarioStyles.step} />
    </SubSurface>
  ) || null

}
