import { scenario } from './scenario'
import { addScenario } from './addScenario'

export const scenarios = theme => ({
  main: {
    flex: 1,
  },
  scenario: scenario(theme),
  addRow: {},
  scenariosRow: {
    flex: 1,
  },
  add: addScenario(theme),
})
