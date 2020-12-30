import { deepMerge } from '@keg-hub/jsutils'
import { tapColors } from '../tapColors'

const chipDefaults = theme => {
  return {
    main: {
      bRad: 3,
      h: `calc( 100% - 6px )`,
      jtC: 'center',
      mR: theme.margin.size / 2,
      pH: theme.padding.size / 1.5,
      bgC: theme.colors.palette.white01,
      ...theme.transition([ 'backgroundColor' ], 0.5),
    },
    icon: {},
    text: {
      ftSz: 14,
      ltrS: 0.5,
      c: tapColors.success,
    }
  }
}

export const chip = theme => {
  const chipDefs = chipDefaults(theme)
  return {
    default: chipDefs,
    hover: deepMerge(chipDefs, {
      main: {
        bgC: tapColors.danger,
      },
      text: {
        c: theme.colors.palette.white01,
      }
    }),
  }
}