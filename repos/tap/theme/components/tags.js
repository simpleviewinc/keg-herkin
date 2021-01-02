import { tapColors } from '../tapColors'
import { sharedButton } from './shared'


const inputHeight = 35

export const tags = theme => ({
  main: {
    padding: theme.padding.size,
    paddingBottom: 0,
    ...theme.flex.center,
    ...theme.flex.justify.start,
  },
  row: {
    p: 0,
    bW: 1,
    bRad: tapColors.borderRadius,
    minH: inputHeight,
    maxH: inputHeight,
    bC: tapColors.border,
    bgC: tapColors.backGround,
    ...theme.flex.align.center,
  },
  title: {
    w: 70,
    h: `100%`,
    d: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    c: tapColors.default,
    pH: theme.padding.size,
    mR: theme.margin.size / 3,
    bCR: tapColors.border,
    borderRightWidth: 1,
    bgC: tapColors.accentBackground,
    ftWt: 'bold',
  },
  container: {
    h: `100%`,
    ...theme.flex.center,
    ...theme.flex.row,
    ovf: 'hidden',
  },
  input: {
    main: {
      flexGrow: 2
    },
    input: {
      bW: 0,
      pL: 0,
      flex: 4,
      width: 'unset',
      outline: 'none',
      bgC: 'transparent',
    }
  },
  button: sharedButton(theme, {
    side: 'right',
    colors: {
      button: {
        default: tapColors.success,
        hover: tapColors.successDark,
        active: tapColors.successLight,
        disabled: tapColors.successLight
      }
    }
  }),
})