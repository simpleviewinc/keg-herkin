import { toRun } from './toRun'
import { results } from './results'
import { isRunning } from './isRunning'
import { runnerTabs } from './runnerTabs'
import { tapColors } from '../../tapColors'

const flexStyle = { fl: 1 }

export const runner = theme => ({
  main: flexStyle,
  surface: {
    main: flexStyle,
    content: flexStyle
  },
  subsurface: {
    main: flexStyle,
    container: flexStyle,
  },
  toRun: toRun(theme),
  results: results(theme),
  isRunning: isRunning(theme),
  tabs: runnerTabs(theme),
})