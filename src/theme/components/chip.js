import { deepMerge } from '@keg-hub/jsutils'
import { tapColors } from '../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const chipDefaults = {
  main: {
    bgC: tapColors.accentBackground,
    p: theme.padding.size / 2,
    mR: theme.margin.size / 2,
    bRad: 20,
    ...theme.transition([ 'backgroundColor' ], 0.5),
  },
  icon: {},
  text: {
    ftSz: 10,
    ltrS: 1,
    ftWt: 'bold'
  }
}

export const chip = {
  default: deepMerge(chipDefaults),
  hover: deepMerge(chipDefaults, {
    main: {
      bgC: tapColors.danger,
    },
    text: {
      color: theme.colors.palette.white01,
    }
  }),

}