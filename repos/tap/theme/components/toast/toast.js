import { tapColors } from '../../tapColors'
import { deepMerge } from '@keg-hub/jsutils'

const defStyles = theme => ({
  main: {
    minW: 240,
    zIndex: 10,
    opacity: 0.8,
    position: 'fixed',
    cursor: 'pointer',
    bRad: tapColors.borderRadius,
    transition: 'transform .6s ease-in',
  },
  content: {
    pV: theme.padding.size / 2,
    pH: theme.padding.size,
    bRad: tapColors.borderRadius,
    mB: theme.margin.size,
  },
  title: {
    mB: 5,
    ftSz: 14,
    ftWt: 'bold',
    c: theme.colors.palette.white01,
  },
  message: {
    mB: 5,
    ftSz: 12,
    c: theme.colors.palette.white01,
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
  title: {},
  message: {}
})

const info = (theme, styles) => deepMerge(styles, {
  content: {
    bgC: tapColors.primaryDark,
  },
  title: {
  },
  message: {
  
  }
})

const warn = (theme, styles) => deepMerge(styles, {
  content: {
    bgC: tapColors.warnDark,
  },
  title: {
  },
  message: {
  
  }
})

const danger = (theme, styles) => deepMerge(styles, {
  main: {
    bgC: tapColors.dangerDark,
  },
  text: {
    c: theme.colors.palette.white01,
  },
  title: {
  },
  message: {
  
  }
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