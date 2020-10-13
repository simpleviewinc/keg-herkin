import { deepMerge } from '@keg-hub/jsutils'
import { tapColors } from '../../tapColors'
import { kegComponentsTheme as theme } from 'SVTheme/kegComponentsTheme'

const selectWidth = 90

export const sharedSelect = (styles, width=selectWidth) => deepMerge({
  main: {
    bgC: theme.colors.palette.transparent,
    bW: 0,
    height: 'auto',
    minH: 'auto',
    maxH: 'auto',
    w: width,
    minW: width,
  },
  select: {
    $all: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      bCR: tapColors.border,
      bgC: tapColors.accentBackground,
      borderRightWidth: 1,
      bRad: tapColors.borderRadius,
      d: 'flex',
      height: 'auto',
      minH: 'auto',
      maxH: 'auto',
      minW: width,
      mR: theme.margin.size / 3,
      pH: theme.padding.size,
      w: width,
    }
  },
  icon: {
    container: {
      color: tapColors.default,
      pointerEvents: 'none',
      position: 'absolute',
      right: 10,
      top: 12,
      zIndex: 1,
    },
    icon: {
      color: tapColors.default,
      fontSize: 12,
    }
  },
}, styles)


export const sharedSelectInline = sharedSelect({
  main: {
    bW: 0,
    bgC: theme.colors.palette.transparent,
    height: 'auto',
    minH: 'auto',
    maxH: 'auto',
    w: `100%`,
    borderRadius: tapColors.borderRadius,
  },
  select: {
    $all: {
      d: 'flex',
      alignItems: 'center',
      alignSelf: 'flex-start',
      pH: theme.padding.size,
      mR: theme.margin.size / 3,
      bW: 1,
      bC: tapColors.border,
      bgC: tapColors.accentBackground,
      borderRadius: tapColors.borderRadius,
      ftSz: 12,
      ftWt: 'normal',
      height: 'auto',
      minH: 'auto',
      maxH: 'auto',
      w: `100%`,
    }
  },
  icon: {
    container: {
      color: tapColors.default,
      position: 'absolute',
      zIndex: 1,
      right: 10,
      top: 12,
      pointerEvents: 'none',
    },
    icon: {
      color: tapColors.default,
      fontSize: 12,
    }
  },
})