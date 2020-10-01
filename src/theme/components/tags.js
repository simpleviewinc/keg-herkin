import { deepMerge } from '@keg-hub/jsutils'
import { tapColors } from '../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const inputHeight = theme?.form?.input?.default?.height ?? 35

const addBtn = {
  main: {
    height: '100%',
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    bgC: tapColors.link,
  }
}

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
    default: addBtn,
    hover: deepMerge(addBtn, {
      main: { bgC: tapColors.linkDark }
    }),
    active: deepMerge(addBtn, {
      main: { bgC: tapColors.linkLight }
    }),
    disabled: deepMerge(addBtn, {
      main: { bgC: tapColors.linkLight }
    })
  }
}