import { deepMerge } from '@keg-hub/jsutils'
import { tapColors } from '../tapColors'
import { sharedButton } from './shared'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const inputHeight = theme?.form?.input?.default?.height ?? 35
const builtBtn = sharedButton({ button: tapColors.success })


export const tags = {
  main: {
    padding: 15,
    paddingBottom: 0,
    ...theme.flex.center,
    ...theme.flex.justify.start,
  },
  row: {
    p: 0,
    bW: 1,
    bRad: 3,
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
    bW: 0,
    pL: 0,
    flex: 4,
    width: 'unset',
    outline: 'none',
    bgC: 'transparent',
  },
  button: {
    main: {
      default: builtBtn.button,
      hover: deepMerge(builtBtn.button, {
        main: { bgC: tapColors.successDark }
      }),
      active: deepMerge(builtBtn.button, {
        main: { bgC: tapColors.successLight }
      }),
      disabled: deepMerge(builtBtn.button, {
        main: { bgC: tapColors.successLight }
      })
    },
    icon: builtBtn.icon,
    text: builtBtn.text
  },
}