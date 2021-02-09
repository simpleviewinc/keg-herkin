import { tapColors } from '../../tapColors'
import { deepMerge } from '@keg-hub/jsutils'

const result = theme => ({
  main: {
    mT: theme?.margin?.size,
    flD: 'row',
    alI: 'baseline',
  },
  label: {
    mR: 4,
    p: theme?.padding?.size / 2,
    c: theme?.colors?.palette?.white01,
    bRad: tapColors.borderRadius,
    ftF: 'Consolas, monaco, monospace'
  },
  row: {
  },
  block: {
    c: tapColors?.default,
  },
  test: {
  },
  error: {
    main: {
      bgC: tapColors?.black,
      p: theme?.padding?.size,
      mT: theme?.margin?.size / 2,
      bRad: tapColors.borderRadius,
    },
    text: {
      mT: theme?.margin?.size / 2,
      c: tapColors.dangerDark,
      ftSz: 16,
      lnH: 20,
      ltrS: 0.25,
    }
  }
})

export const results = theme => {
  const defResult = result(theme)

  return {
    main: {
    },
    pass: deepMerge(defResult, {
      label: {
        bgC: tapColors.success,
      },
    }),
    fail: deepMerge(defResult, {
      label: {
        bgC: tapColors.danger,
      }
    })
  }

}