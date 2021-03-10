import { tapColors } from '../../tapColors'
import { deepMerge } from '@keg-hub/jsutils'

const defStyles = theme => ({
  main: {
    minW: 240,
    zIndex: 10,
    opacity: 0.95,
    position: 'fixed',
    cursor: 'pointer',
    bRad: tapColors.borderRadius,
  },
  content: {
    opacity: 1,
    ...theme.transition([ 'opacity' ], 0.8),
    p: theme.padding.size - (theme.padding.size / 3),
    pR: theme.padding.size,
    bRad: tapColors.borderRadius,
    mB: theme.margin.size,
    flD: 'row',
  },
  left: {
    jtC: 'center',
  },
  right: {
    jtC: 'center',
  },
  icon: {
    color: theme.colors.palette.white01,
    mR: 10,
  },
  title: {
    mB: 5,
    ftSz: 16,
    ftWt: 'bold',
    c: theme.colors.palette.white01,
  },
  message: {
    ftSz: 14,
    c: theme.colors.palette.white01,
  },
  hover: {
    content: {
      opacity: 0.6,
    }
  },
  active: {
    content: {
      opacity: 0.2,
    }
  },
})

const topRight = (theme, styles) => deepMerge(styles, {
  main: {
    top: 15,
    right: 15,
  }
})

const bottomRight = (theme, styles) => deepMerge(styles, {
  main: {
    right: 15,
    bottom: 15,
  }
})

const topLeft = (theme, styles) => deepMerge(styles, {
  main: {
    top: 15,
    left: 15,
    transition: 'transform .6s ease-in'
  }
})

const bottomLeft = (theme, styles) => deepMerge(styles, {
  main: {
    left: 15,
    bottom: 15,
    transition: 'transform .6s ease-in'
  }
})

const success = (theme, styles) => deepMerge(styles, {
  content: {
    bgC: tapColors.successDark,
  },
})

const info = (theme, styles) => deepMerge(styles, {
  content: {
    bgC: tapColors.primaryDark,
  },
})

const warn = (theme, styles) => deepMerge(styles, {
  content: {
    bgC: tapColors.warnDark,
  },
})

const danger = (theme, styles) => deepMerge(styles, {
  content: {
    bgC: tapColors.dangerDark,
  },
})

export const toast = theme => {
  const styles = defStyles(theme)
  return {
    topLeft: topLeft(theme, styles),
    bottomLeft: bottomLeft(theme, styles),
    topRight: topRight(theme, styles),
    bottomRight: bottomRight(theme, styles),
    success: success(theme, styles),
    info: info(theme, styles),
    warn: warn(theme, styles),
    danger: danger(theme, styles),
  }
}