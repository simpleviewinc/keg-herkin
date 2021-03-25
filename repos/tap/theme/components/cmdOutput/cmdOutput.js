import { renderOutput } from './renderOutput'
import { tapColors } from '../../tapColors'

export const cmdOutput = theme => {
  return {
    surface: {
      main: {
        mB: theme.margin.size * 2,
      },
    },
    main: {
      p: theme.padding.size,
    },
    row: {
      h: 350,
      maxH: 350,
      overflowY: 'auto',
      borderRightWidth: 0,
      p: theme.padding.size,
      bgC: tapColors.defaultDark60,
      bC: tapColors.borderColor,
      bW: 2,
      bRad: tapColors.borderRadius,
    },
    renderOutput: renderOutput(theme),
  }
}